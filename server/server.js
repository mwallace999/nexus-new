import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// DATA STORE
const dataStore = {
    // XXZXX -  Add data {socket: socket, room: room, player_number: player_number}
    users: []
}

// HELPER FUNCTIONS
const getRoom = (socket) => Array.from(socket.rooms)[1];

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    // XXZXX -  Need work -  Add user to first empty room / dynamically assign player #
    dataStore.users.push(socket.id);
    const room = `Room${Math.ceil(dataStore.users.length/2)}`;
    socket.join(room);
    console.log(`A user connected to ${room}`);

    //to get the number of clients in this room
    const clients = io.sockets.adapter.rooms.get(room);
    const playerNumber = clients ? clients.size : 0;

    io.to(socket.id).emit('thisPlayer', playerNumber);

    console.log(`There are ${playerNumber} players in the room`);

    // console.log('CURRENT USERS:', dataStore.users)

    socket.on('disconnect', () => {
        dataStore.users =  dataStore.users.filter((user) => user !== socket.id);
        console.log('A user disconnected');
        // console.log('CURRENT USERS:', dataStore.users)
    });

    socket.on('syncNewGame', (setup) => {
        const board = createBoard(setup);
        const userRoom = getRoom(socket);
        const boardState = {
            tokens: [],
            board,
            activeHex: null,
            enemyHex: null
        }
        io.to(userRoom).emit('boardState', boardState);
    });

    socket.on('syncBoardState', (boardState) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING BOARD STATE: ${userRoom}`);
        io.to(userRoom).emit('boardState', boardState);
    })

    socket.on('syncRollResult', (rollResult) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING ROLL RESULT: ${userRoom}`);
        io.to(userRoom).emit('rollResult', rollResult);
    })

    socket.on('syncActiveModal', (activeModal) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING ACTIVE MODAL: ${userRoom}`);
        io.to(userRoom).emit('activeModal', activeModal);
    })

    socket.on('syncCurrentPlayer', (nextPlayer) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING CURRENT PLAYER: ${userRoom}`);
        io.to(userRoom).emit('currentPlayer', nextPlayer);
    })
    
});

// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

