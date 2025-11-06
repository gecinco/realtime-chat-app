'use client';

import { useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Message } from '@/lib/types';

interface MessageListProps {
  messages: Message[];
  currentUsername: string;
}

export default function MessageList({ messages, currentUsername }: MessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll para última mensagem
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">
          Nenhuma mensagem ainda. Seja o primeiro a enviar! 👋
        </p>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 messages-container"
    >
      {messages.map((message) => {
        const isOwn = message.username === currentUsername;
        
        return (
          <div
            key={message.id}
            className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                isOwn 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white border shadow-sm'
              }`}
            >
              {!isOwn && (
                <p className="text-xs font-medium text-primary-600 mb-1">
                  {message.username}
                </p>
              )}
              <p className={isOwn ? 'text-white' : 'text-gray-800'}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${isOwn ? 'text-primary-200' : 'text-gray-400'}`}>
                {format(new Date(message.timestamp), 'HH:mm', { locale: ptBR })}
              </p>
            </div>
          </div>
        );
      })}
      
      {/* TODO: Implementar typing indicator aqui */}
      {/* {typingUsers.length > 0 && (
        <div className="text-sm text-gray-500 italic">
          {typingUsers.join(', ')} está digitando...
        </div>
      )} */}
    </div>
  );
}
