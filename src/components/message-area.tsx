import React, { useState, useEffect, useRef } from 'react';
import { User } from '@/services/http/users-http.service';
import getPastelColor from '@/shared/utils/get-pastel-color.util';
import { Message } from '@/services/http/messages-http.service';

interface MessageAreaProps {
  selectedUser: User | null;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (message: string) => void;
  onlineUsers: string[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ 
  selectedUser, 
  messages, 
  currentUserId, 
  onSendMessage,
  onlineUsers 
}) => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {selectedUser ? (
        <>
          <div className="p-4 flex items-center bg-white border-b">
            <div 
              className="w-12 h-12 relative rounded-full flex items-center justify-center"
              style={{ backgroundColor: getPastelColor(selectedUser.username) }}
            >
              <div 
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                  ${onlineUsers.includes(selectedUser.username) ? 'bg-green-400' : 'bg-gray-400'}`} 
              />
              <span className="text-xl text-gray-700 font-semibold">
                {selectedUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800">
                {selectedUser.name}
              </h2>
              <span className="text-sm text-gray-500">
                @{selectedUser.username}
              </span>
            </div>
          </div>

          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.from === currentUserId ? "justify-end" : "justify-start"
                } space-y-1`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[70%] ${
                    msg.from === currentUserId
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p className="break-words">{msg.content}</p>
                  <span className={`text-xs ${
                    msg.from === currentUserId ? "text-blue-100" : "text-gray-400"
                  }`}>
                    {/* Aqui poderia ter horário da mensagem */}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white border-t flex items-center space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          Selecione um usuário para iniciar uma conversa
        </div>
      )}
    </div>
  );
};

export default MessageArea