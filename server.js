const express = require('express');
const app = express();
const port = 7004;
const { join } = require('node:path');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected to socket', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('typing', () => {
        socket.broadcast.emit('typing');  
    });

    socket.on('not_typing', () => {
        socket.broadcast.emit('not_typing');
    })
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
