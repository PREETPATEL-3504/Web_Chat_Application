const { Server } = require('socket.io')
const http = require('http')
const express = require('express');

const app = express()
const server = http.createServer(app);

//Socket Connection
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    },
});

//Send receiverid into messagesocket
const getreceiverSocketId = (recevierId) => {
    console.log("Socker RecevierId", recevierId)
    return userSocketmap[recevierId];
};


//Collect logins userId and socketId
const userSocketmap = {};

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    const userId = socket.handshake.query.userId

    if (userId !== undefined) {
        userSocketmap[userId] = socket.id;
    }
    //Send onlist user id to frontend
    io.emit('getOnlineUser', Object.keys(userSocketmap));

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        delete userSocketmap[userId];
        io.emit('getOnlineUser', Object.keys(userSocketmap));

    });
})

module.exports = { app, io, server, getreceiverSocketId }
