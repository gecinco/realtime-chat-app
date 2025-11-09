'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Por favor, digite um nome de usuário');
      return;
    }

    if (username.length < 3) {
      setError('Nome de usuário deve ter pelo menos 3 caracteres');
      return;
    }

    // Salva username no localStorage (temporário até implementar auth)
    localStorage.setItem('chat_username', username);
    router.push('/chat');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💬 Realtime Chat
          </h1>
          <p className="text-gray-500">
            Entre para começar a conversar
          </p>
        </div>

        <form onSubmit={handleJoin} className="space-y-4">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome de usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              placeholder="Digite seu nome..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Entrar no Chat
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🚧 Projeto em desenvolvimento</p>
          {/* TODO: Adicionar login com Google/GitHub */}
        </div>
      </div>
    </main>
  );
}
