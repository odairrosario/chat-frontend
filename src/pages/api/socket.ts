import { NextApiRequest, NextApiResponse } from 'next';
import { Server as SocketIOServer } from 'socket.io';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!(res.socket as any).server.io) {
    
    const io = new SocketIOServer((res.socket as any).server, {
      path: '/api/socket',
      addTrailingSlash: false,
    });

    const userSockets = new Map();

    io.on('connection', socket => {
      socket.on('auth', (username) => {
        userSockets.set(username, socket.id);

        io.emit('user_connected', username);
        
        socket.emit('online_users', Array.from(userSockets.keys()));
      });

      socket.on('message', (message) => {
        socket.emit('message', message);
        
        const toSocketId = userSockets.get(message.to);
        if (toSocketId) {
          io.to(toSocketId).emit('message', message);
        }
      });

      socket.on('disconnect', () => {
        let disconnectedUsername: string | undefined;
        
        userSockets.forEach((socketId, username) => {
          if (socketId === socket.id) {
            disconnectedUsername = username;
          }
        });

        if (disconnectedUsername) {
          userSockets.delete(disconnectedUsername);
          io.emit('user_disconnected', disconnectedUsername);
        }
      });
    });

    (res.socket as any).server.io = io;
  }

  res.end();
}

export const config = {
  api: {
    bodyParser: false
  }
}