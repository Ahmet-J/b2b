import { Server } from 'socket.io';
import * as http from 'http';

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:3000',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('register', (userId: string) => {
      socket.join(`user-${userId}`);
    });

    socket.on('join-inquiry', (inquiryId: string) => {
      socket.join(`inquiry-${inquiryId}`);
    });

    socket.on('send-message', (data) => {
      io.to(`inquiry-${data.inquiryId}`).emit('new-message', data);
      io.to(`user-${data.receiverId}`).emit('notification', {
        type: 'message',
        message: 'Waxaad heshay fariin cusub',
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};