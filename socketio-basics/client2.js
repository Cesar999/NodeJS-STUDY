const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connected', (data)=>{
    console.log(data);
    socket.emit('init', {nickname: 'leslie'});
})

socket.on('private-message', (data)=>{
    console.log(`FROM: ${data.from} - ${data.msg}`);
});

setTimeout(()=>{
    socket.emit('private-message', {to: 'ricardo', msg: 'Corazon'});
}, 2000);


socket.on('broadcast', (data) => {
    console.log(data);
});

socket.emit('create', 'room1');

socket.on('room', (data) => {
    console.log(data);
});

setTimeout(()=>{
    socket.emit('room', {room: 'room1', msg: 'Hi Guys'});
}, 3000);

socket.on('user-left', (data) => {
    console.log(data);
});
