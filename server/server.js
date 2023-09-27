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

// Configure CORS to allow requests from specific origins
// app.use(
//   cors({
//     origin: 'http://localhost:8080', // Replace with the origin of your Vue.js app
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     allowedHeaders: ['Content-Type', 'Authorization'],

//   })
// );

// Socket.io event handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle a specific event (e.g., when a player makes a move)
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

// localhost/:1 Access to XMLHttpRequest at 'http://localhost:3000/socket.io/?EIO=4&transport=polling&t=OhOEOj7' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.