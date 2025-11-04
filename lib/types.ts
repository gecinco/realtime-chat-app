// Tipos compartilhados entre cliente e servidor

export interface User {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

export interface Message {
  id: string;
  content: string;
  userId: string;
  username: string;
  roomId: string;
  timestamp: Date;
  // TODO: Adicionar suporte a tipos de mensagem (texto, imagem, arquivo)
  // type: 'text' | 'image' | 'file';
}

export interface Room {
  id: string;
  name: string;
  description?: string;
  users: User[];
  createdAt: Date;
  // TODO: Adicionar owner e permissões
  // ownerId: string;
  // isPrivate: boolean;
}

// Socket Events
export interface ServerToClientEvents {
  'user:joined': (user: User, roomId: string) => void;
  'user:left': (userId: string, roomId: string) => void;
  'message:new': (message: Message) => void;
  'room:users': (users: User[]) => void;
  'error': (error: string) => void;
  // TODO: typing indicator
  // 'user:typing': (userId: string, roomId: string) => void;
  // 'user:stopped-typing': (userId: string, roomId: string) => void;
}

export interface ClientToServerEvents {
  'room:join': (roomId: string, username: string) => void;
  'room:leave': (roomId: string) => void;
  'message:send': (roomId: string, content: string) => void;
  // TODO: typing indicator
  // 'typing:start': (roomId: string) => void;
  // 'typing:stop': (roomId: string) => void;
}
