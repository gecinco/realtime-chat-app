'use client';

import { useEffect, useState, useRef } from 'react';
import { getSocket, connectSocket, disconnectSocket } from '@/lib/socket';
import type { Message, User } from '@/lib/types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';

interface ChatRoomProps {
  roomId: string;
  username: string;
}

export default function ChatRoom({ roomId, username }: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const previousRoomRef = useRef<string | null>(null);

  useEffect(() => {
    const socket = getSocket();

    // Conecta se ainda não estiver conectado
    connectSocket();

    // Event handlers
    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('room:join', roomId, username);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    const handleNewMessage = (message: Message) => {
      setMessages(prev => [...prev, message]);
    };

    const handleUsersUpdate = (updatedUsers: User[]) => {
      setUsers(updatedUsers);
    };

    const handleUserJoined = (user: User, room: string) => {
      if (room === roomId) {
        // TODO: Mostrar notificação de entrada
        console.log(`${user.username} entrou na sala`);
      }
    };

    const handleUserLeft = (userId: string, room: string) => {
      if (room === roomId) {
        // TODO: Mostrar notificação de saída
        console.log(`Usuário ${userId} saiu da sala`);
      }
    };

    // Registra listeners
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('message:new', handleNewMessage);
    socket.on('room:users', handleUsersUpdate);
    socket.on('user:joined', handleUserJoined);
    socket.on('user:left', handleUserLeft);

    // Se já estiver conectado, entra na sala
    if (socket.connected) {
      // Sai da sala anterior se existir
      if (previousRoomRef.current && previousRoomRef.current !== roomId) {
        socket.emit('room:leave', previousRoomRef.current);
      }
      socket.emit('room:join', roomId, username);
    }

    previousRoomRef.current = roomId;

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('message:new', handleNewMessage);
      socket.off('room:users', handleUsersUpdate);
      socket.off('user:joined', handleUserJoined);
      socket.off('user:left', handleUserLeft);
    };
  }, [roomId, username]);

  // Limpa mensagens ao trocar de sala
  useEffect(() => {
    setMessages([]);
  }, [roomId]);

  const handleSendMessage = (content: string) => {
    const socket = getSocket();
    socket.emit('message:send', roomId, content);
  };

  const roomNames: Record<string, string> = {
    general: '# General',
    tech: '# Tech Talk',
  };

  return (
    <div className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {roomNames[roomId] || `# ${roomId}`}
          </h2>
          <p className="text-sm text-gray-500">
            {users.length} {users.length === 1 ? 'usuário' : 'usuários'} online
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}
          />
          <span className="text-sm text-gray-500">
            {isConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <MessageList 
            messages={messages}
            currentUsername={username}
          />
          <MessageInput 
            onSend={handleSendMessage}
            disabled={!isConnected}
          />
        </div>

        {/* User list sidebar */}
        <UserList users={users} />
      </div>
    </div>
  );
}
