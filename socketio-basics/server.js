const express = require(`express`);
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port,()=>{
    console.log(`Listening port 3000`);
});

const io = socket(server);

const CLIENTS = {};

io.sockets.on('connection', (socket)=>{

    socket.on('create', function(room) {
        socket.join(room);
        io.sockets.in(room).emit('room', {msg: 'This is ' + room});
    });

    socket.emit('connected', {
        msg: 'Client Connected'
    });

    socket.on('init', (data)=>{
        socket.nickname = data.nickname;
        CLIENTS[socket.nickname] = socket;

        io.emit('broadcast', {msg: `The client ${socket.nickname} has connected`});
    });

    // const clients = io.sockets.adapter.rooms;
    // console.log(clients);

    socket.on('room', (data)=>{
        io.sockets.in(data.room).emit('room', {msg: data.msg});
    })

    socket.on('join', function(room) {
        socket.join(room);
        io.sockets.in(room).emit('room', {msg: `User ${socket.nickname} has joined ${room}`});
    });

    socket.on('leave-room', (data)=>{
        socket.leave(data.room);
        socket.to(data.room).emit('user-left', {msg: `Client: ${socket.nickname} left ${data.room}`});
    })

    socket.on('private-message', (data)=>{
        if(data.to) return;
        CLIENTS[data.to].emit('private-message', {msg: data.msg, from: socket.nickname})
    });

    socket.on('disconnect', (data)=>{ 
        io.emit('broadcast', {msg: `The client ${socket.nickname} has disconnected`});
        const clients = io.sockets.adapter.rooms;
        console.log(clients); 
    });

});