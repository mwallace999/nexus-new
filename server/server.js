import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Add Rooms for multiuser handling, emit selectively
const dataStore = {
    users: []
}

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    dataStore.users.push(socket.id);
    console.log(`A user connected`);
    console.log('CURRENT USERS:', dataStore.users)


    socket.on('disconnect', () => {
        dataStore.users =  dataStore.users.filter((user) => user !== socket.id);
        console.log('A user disconnected');
        console.log('CURRENT USERS:', dataStore.users)
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

