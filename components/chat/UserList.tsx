'use client';

import type { User } from '@/lib/types';

interface UserListProps {
  users: User[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <aside className="w-60 bg-white border-l hidden lg:block">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-700">
          Usuários Online — {users.length}
        </h3>
      </div>
      
      <div className="p-2">
        {users.length === 0 ? (
          <p className="text-sm text-gray-500 p-2">
            Nenhum usuário online
          </p>
        ) : (
          <ul className="space-y-1">
            {users.map((user) => (
              <li 
                key={user.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-50"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium">
                    {user.username[0].toUpperCase()}
                  </div>
                  <span 
                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                      user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <span className="text-sm text-gray-700 truncate">
                  {user.username}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* TODO: Implementar busca de usuários */}
      {/* TODO: Implementar DM ao clicar no usuário */}
    </aside>
  );
}
