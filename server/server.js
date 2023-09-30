import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// DATA STORE
const dataStore = {
    users: []
}

// HELPER FUNCTIONS
const getRoom = (socket) => Array.from(socket.rooms)[1];

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    dataStore.users.push(socket.id);
    const room = `Room${Math.ceil(dataStore.users.length/2)}`;
    socket.join(room);
    console.log(`A user connected to ${room}`);
    // console.log('CURRENT USERS:', dataStore.users)

    socket.on('disconnect', () => {
        dataStore.users =  dataStore.users.filter((user) => user !== socket.id);
        console.log('A user disconnected');
        // console.log('CURRENT USERS:', dataStore.users)
    });

    socket.on('syncNewGame', (setup) => {
        const board = createBoard(setup);
        const userRoom = getRoom(socket)
        io.to(userRoom).emit('newGame', board);
    });

    socket.on('syncBoardState', (boardState) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING BOARD STATE: ${userRoom}`);
        io.to(userRoom).emit('boardState',  boardState);
    })
});

// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

