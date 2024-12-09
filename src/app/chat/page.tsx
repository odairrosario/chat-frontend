"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth.hook";
import toast from "react-hot-toast";
import UsersList from "@/components/user-list";
import MessageArea from "@/components/message-area";
import { User } from "@/services/http/users-http.service";
import { Message, messagesHttpService } from "@/services/http/messages-http.service";
import { usersHttpService } from "@/services/http/users-http.service";
import { useQuery } from "@tanstack/react-query";
import getPastelColor from '@/shared/utils/get-pastel-color.util';
import { useWebSocket } from '@/hooks/use-websocket.hook';

const Chat = () => {
  const { data: authData } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const { sendMessage: sendWebSocketMessage, socket } = useWebSocket();
  const [unreadMessages, setUnreadMessages] = useState<Record<string, number>>({});

  const { 
    data: users = [], 
    isLoading: isLoadingUsers 
  } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await usersHttpService.getAll();
      return response.filter(
        (user: User) => user.username !== authData?.user?.username
      );
    },
    retry: false,
    gcTime: 0,
  });


  useEffect(() => {
    if (selectedUser && authData?.user?.username) {
      messagesHttpService.getAll().then(allMessages => {
        const chatMessages = allMessages.filter(msg => 
          (msg.from === authData?.user?.username && msg.to === selectedUser.username) ||
          (msg.from === selectedUser.username && msg.to === authData?.user?.username)
        );
        setMessages(chatMessages);
        
        setUnreadMessages(prev => ({
          ...prev,
          [selectedUser.username]: 0
        }));
      });
    }
  }, [selectedUser, authData?.user?.username]);

  useEffect(() => {
    if (!socket) return;

    socket.on('user_connected', (username: string) => {
      setOnlineUsers(prev => [...prev, username]);
    });

    socket.on('user_disconnected', (username: string) => {
      setOnlineUsers(prev => prev.filter(u => u !== username));
    });

    socket.on('online_users', (users: string[]) => {
      setOnlineUsers(users);
    });

    socket.on('message', (message) => {
      setMessages(prev => [...prev, message]);

      if (
        message.to === authData?.user?.username && 
        message.from !== selectedUser?.username
      ) {
        setUnreadMessages(prev => ({
          ...prev,
          [message.from]: (prev[message.from] || 0) + 1
        }));
      }
    });

    return () => {
      socket.off('user_connected');
      socket.off('user_disconnected');
      socket.off('online_users');
      socket.off('message');
    };
  }, [socket, selectedUser, authData?.user?.username]);

  const selectUser = (user: User) => {
    setSelectedUser(user);
    setUnreadMessages(prev => ({ ...prev, [user.username]: 0 }));
  };

  const sendMessage = async (content: string) => {
    if (selectedUser && content.trim() && authData?.user?.username) {
      const message: Message = {
        from: authData.user.username,
        to: selectedUser.username,
        content
      };
      
      try {
        await messagesHttpService.send(message);
        sendWebSocketMessage(message);
      } catch (error) {
        toast.error('Erro ao enviar mensagem');
      }
    }
  };

  return (
    <div className="container mx-auto p-4 h-screen">
      <div className="flex h-[calc(100vh-2rem)] bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="w-1/3 border-r">
          <div className="p-4 flex items-center bg-white border-b">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: getPastelColor(authData?.user?.username || '') }}
            >
              <span className="text-xl text-gray-700 font-semibold">
                {authData?.user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-800">
                {authData?.user?.name}
              </h2>
              <span className="text-sm text-gray-500">
                @{authData?.user?.username}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <UsersList 
              users={users} 
              onSelectUser={selectUser} 
              loading={isLoadingUsers} 
              onlineUsers={onlineUsers}
              unreadMessages={unreadMessages}
            />
          </div>
        </div>
        <div className="w-2/3 flex flex-col">
          <MessageArea
            selectedUser={selectedUser}
            messages={messages}
            currentUserId={String(authData?.user?.username) || ""}
            onSendMessage={sendMessage}
            onlineUsers={onlineUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;