import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:8080',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
const server = http.createServer(app);
const io = new Server(server);

// SOCKET.IO HANDLING
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('selectAction', (moveData) => {
        console.log('MOVE DATA RECEIVED!!!', moveData)
        io.emit('newAction', moveData);
    });

    socket.on('generateBoard', (setup) => {
        const { layout, colors } = setup;
        const hexCount = layout.reduce((acc, h) => acc + h, 0);
        const minCount = Math.floor(hexCount / colors.length);
        let extra = hexCount % colors.length;
        let hexId = 1;
        const countObj = {};
        const board = [];
        colors.map(c => countObj[c] = minCount);
        while (extra) {
            const randColor = colors[ Math.floor(Math.random() * colors.length)];
            if (countObj[randColor] === minCount) {
                countObj[randColor]++;
                extra--;
            }
        }
        const fetchColor = () => {
            const randColor =  Object.keys(countObj)[ Math.floor(Math.random() * Object.keys(countObj).length)];
            countObj[randColor]--;
            if (!countObj[randColor]) delete countObj[randColor];
            return randColor;
        }
        layout.forEach((rowCount, r) => {
            const hexRowArr = [];
            for (let i = 0; i < rowCount; i++) {
                const hexColor = fetchColor();
                hexRowArr.push({
                    id: hexId++,
                    row: r,
                    index: i,
                    hexColor,
                    // hexBorderColor: hexColor
                    tokenPlayer: 1
                })
            }
            board.push(hexRowArr);
        })
        console.log('BOARD', board)
        io.emit('newBoard', board);
    });
  
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

