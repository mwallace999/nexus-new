import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('syncNewGame', (setup) => {
        const board = createBoard(setup);
        io.emit('newGame', board);
    });

    socket.on('syncBoardState', (boardState) => {
        console.log('SYNCING BOARD STATE');
        io.emit('boardState',  boardState);
    })
  
});

// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

