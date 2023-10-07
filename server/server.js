import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createBoard } from './controller/board'

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// DATA STORE
const dataStore = {
    users: [],
    rooms: [],
}

// HELPER FUNCTIONS
const getRoom = (socket) => Array.from(socket.rooms)[1];

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    const index = dataStore.rooms.findIndex((room) => room.length < 2);
    let room, playerNumber;

    if (index !== -1) {
        playerNumber = dataStore.rooms[index][0] && dataStore.rooms[index][0].playerNumber === 1 ? 2 : 1;
        room = index + 1;
        dataStore.rooms[index].push({
            socket: socket.id,
            roomName: `Room ${room}`,
            playerNumber
        });      
    } else {
        playerNumber = 1;
        room = dataStore.rooms.length + 1;
        dataStore.rooms.push([{
            socket: socket.id,
            roomName: `Room ${room}`,
            playerNumber
        }]);    
    }

    dataStore.users.push(socket.id);
    socket.join(room);
    console.log(`A user connected to Room ${room}`);
    console.log('ROOMS', dataStore.rooms);
    // Emit PlayerNumber to sync client
    io.to(socket.id).emit('thisPlayer', playerNumber);

    socket.on('disconnect', () => {
        dataStore.users = dataStore.users.filter((user) => user !== socket.id);

        dataStore.rooms.forEach((room, index) => {
            const itemIndex = room.findIndex((client) => client.socket === socket.id);
            if (itemIndex !== -1) {
                room.splice(itemIndex, 1);
                if (room.length === 0) dataStore.users.splice(index, 1);
            }
         });
        console.log('A user disconnected');
        console.log('ROOMS', dataStore.rooms);
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
        console.log(`SYNCING BOARD STATE: Room ${userRoom}`);
        io.to(userRoom).emit('boardState', boardState);
    })

    socket.on('syncRollResult', (rollResult) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING ROLL RESULT: Room ${userRoom}`);
        io.to(userRoom).emit('rollResult', rollResult);
    })

    socket.on('syncActiveModal', (activeModal) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING ACTIVE MODAL: Room ${userRoom}`);
        io.to(userRoom).emit('activeModal', activeModal);
    })

    socket.on('syncCurrentPlayer', (nextPlayer) => {
        const userRoom = getRoom(socket);
        console.log(`SYNCING CURRENT PLAYER: Room ${userRoom}`);
        io.to(userRoom).emit('currentPlayer', nextPlayer);
    })
    
});

// START SERVER
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

