import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
  cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);


// Socket.io event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('makeMove', (moveData) => {
    // Broadcast the move to all connected clients, including the sender
    console.log('MOVE DATA RECEIVED!!!', moveData)
    io.emit('moveReceived', moveData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
  
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

