'use client';

import { useState, useRef, useEffect } from 'react';

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function MessageInput({ onSend, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Foca no input ao montar
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSend(trimmedMessage);
    setMessage('');
  };

  // TODO: Implementar typing indicator
  // const handleTyping = () => {
  //   // Debounce e emitir evento de typing
  // };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white border-t p-4"
    >
      <div className="flex gap-2">
        {/* TODO: Botão de anexar arquivo */}
        {/* <button type="button" className="...">
          📎
        </button> */}

        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={disabled ? 'Conectando...' : 'Digite sua mensagem...'}
          disabled={disabled}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />

        <button
          type="submit"
          disabled={disabled || !message.trim()}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
