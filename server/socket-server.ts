import { Server } from 'socket.io';
import { createServer } from 'http';
import type { 
  ServerToClientEvents, 
  ClientToServerEvents, 
  User, 
  Message,
  Room 
} from '../lib/types';

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// In-memory storage (em produção, usar Redis ou banco de dados)
const rooms = new Map<string, Room>();
const users = new Map<string, User>();
const socketToUser = new Map<string, string>(); // socketId -> odepoisuserId

// Inicializa sala padrão
rooms.set('general', {
  id: 'general',
  name: 'General',
  description: 'Sala geral de discussão',
  users: [],
  createdAt: new Date(),
});

rooms.set('tech', {
  id: 'tech',
  name: 'Tech Talk',
  description: 'Discussões sobre tecnologia',
  users: [],
  createdAt: new Date(),
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Usuário entra em uma sala
  socket.on('room:join', (roomId: string, username: string) => {
    // Cria usuário
    const user: User = {
      id: socket.id, // TODO: usar ID persistente após implementar auth
      username,
      status: 'online',
    };

    users.set(user.id, user);
    socketToUser.set(socket.id, user.id);

    // Entra na sala
    socket.join(roomId);

    const room = rooms.get(roomId);
    if (room) {
      room.users.push(user);
      
      // Notifica outros usuários
      socket.to(roomId).emit('user:joined', user, roomId);
      
      // Envia lista de usuários para quem entrou
      io.to(roomId).emit('room:users', room.users);
    }

    console.log(`${username} joined room: ${roomId}`);
  });

  // Usuário sai da sala
  socket.on('room:leave', (roomId: string) => {
    const userId = socketToUser.get(socket.id);
    if (userId) {
      socket.leave(roomId);
      
      const room = rooms.get(roomId);
      if (room) {
        room.users = room.users.filter(u => u.id !== userId);
        socket.to(roomId).emit('user:left', userId, roomId);
        io.to(roomId).emit('room:users', room.users);
      }
    }
  });

  // Nova mensagem
  socket.on('message:send', (roomId: string, content: string) => {
    const userId = socketToUser.get(socket.id);
    const user = userId ? users.get(userId) : null;

    if (!user) {
      socket.emit('error', 'Usuário não encontrado');
      return;
    }

    // TODO: Validar conteúdo (tamanho máximo, caracteres proibidos, etc)
    // TODO: Salvar mensagem no banco de dados
    
    const message: Message = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      userId: user.id,
      username: user.username,
      roomId,
      timestamp: new Date(),
    };

    // Envia para todos na sala (incluindo quem enviou)
    io.to(roomId).emit('message:new', message);

    console.log(`[${roomId}] ${user.username}: ${content}`);
  });

  // TODO: Implementar typing indicator
  // socket.on('typing:start', (roomId) => {
  //   const userId = socketToUser.get(socket.id);
  //   if (userId) {
  //     socket.to(roomId).emit('user:typing', userId, roomId);
  //   }
  // });

  // Desconexão
  socket.on('disconnect', () => {
    const userId = socketToUser.get(socket.id);
    
    if (userId) {
      // Remove usuário de todas as salas
      rooms.forEach((room, roomId) => {
        const userIndex = room.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
          room.users.splice(userIndex, 1);
          socket.to(roomId).emit('user:left', userId, roomId);
          io.to(roomId).emit('room:users', room.users);
        }
      });

      users.delete(userId);
      socketToUser.delete(socket.id);
    }

    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.SOCKET_PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down...');
  io.close(() => {
    console.log('Socket.IO server closed');
    process.exit(0);
  });
});
