"use client";
import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './use-auth.hook';

export const useWebSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { data: { user } } = useAuth();
  const reconnectingRef = useRef(false);

  useEffect(() => {
    if (!user) return;
    if (socketRef.current?.connected) return;
    if (reconnectingRef.current) return;

    reconnectingRef.current = true;
    
    const socket = io({
      path: '/api/socket',
      addTrailingSlash: false,
    });

    socket.on('connect', () => {
      socket.emit('auth', user.username);
    });

    socketRef.current = socket;
    reconnectingRef.current = false;

    return () => {
      reconnectingRef.current = false;
      if (socket) socket.disconnect();
    };
  }, [user]);

  const sendMessage = (message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('message', message);
    }
  };

  return { 
    sendMessage,
    socket: socketRef.current 
  };
};