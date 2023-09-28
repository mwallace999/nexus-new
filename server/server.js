import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { generateBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('selectAction', (moveData) => {
        console.log('MOVE DATA RECEIVED!!!', moveData);
        io.emit('newAction', moveData);
    });

    socket.on('generateBoard', (setup) => {
        const board = generateBoard(setup);
        io.emit('newBoard', board);
    });
  
});

// Start server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

