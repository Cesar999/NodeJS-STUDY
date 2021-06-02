const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connected', (data)=>{
    console.log(data);
    socket.emit('init', {nickname: 'cesar'});
})

socket.on('private-message', (data)=>{
    console.log(`FROM: ${data.from} - ${data.msg}`);
});

setTimeout(()=>{
    socket.emit('private-message', {to: 'leslie', msg: 'Hello There!'});
    socket.emit('join', 'room1');
}, 2000);

socket.on('broadcast', (data) => {
    console.log(data);
});

socket.on('room', (data) => {
    console.log(data);
});

setTimeout(()=>{
    socket.emit('leave-room', {room: 'room1'});
}, 4000);

