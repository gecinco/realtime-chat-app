'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatRoom from '@/components/chat/ChatRoom';
import RoomList from '@/components/chat/RoomList';

export default function ChatPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [currentRoom, setCurrentRoom] = useState('general');
  const router = useRouter();

  useEffect(() => {
    // Verifica se tem username salvo
    const savedUsername = localStorage.getItem('chat_username');
    if (!savedUsername) {
      router.push('/');
      return;
    }
    setUsername(savedUsername);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('chat_username');
    router.push('/');
  };

  if (!username) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar com lista de salas */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">💬 Chat</h1>
        </div>

        <RoomList 
          currentRoom={currentRoom}
          onRoomSelect={setCurrentRoom}
        />

        {/* User info no rodapé */}
        <div className="mt-auto p-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                {username[0].toUpperCase()}
              </div>
              <span className="text-sm">{username}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white text-sm"
              title="Sair"
            >
              Sair
            </button>
          </div>
        </div>
      </aside>

      {/* Chat principal */}
      <main className="flex-1 flex flex-col">
        <ChatRoom 
          roomId={currentRoom}
          username={username}
        />
      </main>
    </div>
  );
}
