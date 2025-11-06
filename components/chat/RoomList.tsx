'use client';

interface RoomListProps {
  currentRoom: string;
  onRoomSelect: (roomId: string) => void;
}

// Por enquanto, salas são hardcoded
// TODO: Buscar salas do servidor e permitir criar novas
const ROOMS = [
  { id: 'general', name: 'General', emoji: '💬' },
  { id: 'tech', name: 'Tech Talk', emoji: '💻' },
];

export default function RoomList({ currentRoom, onRoomSelect }: RoomListProps) {
  return (
    <nav className="flex-1 p-2">
      <p className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase">
        Canais
      </p>
      
      <ul className="space-y-1">
        {ROOMS.map((room) => (
          <li key={room.id}>
            <button
              onClick={() => onRoomSelect(room.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-left transition ${
                currentRoom === room.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>{room.emoji}</span>
              <span>{room.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* TODO: Botão para criar nova sala */}
      {/* <button className="w-full mt-2 px-3 py-2 text-gray-400 hover:text-white text-sm flex items-center gap-2">
        <span>+</span>
        <span>Nova sala</span>
      </button> */}

      {/* TODO: Seção de DMs */}
      {/* <p className="px-3 py-2 mt-4 text-xs font-semibold text-gray-400 uppercase">
        Mensagens Diretas
      </p> */}
    </nav>
  );
}
