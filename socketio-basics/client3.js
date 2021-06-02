const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connected', (data)=>{
    console.log(data);
    socket.emit('init', {nickname: 'ricardo'});
})

socket.on('private-message', (data)=>{
    console.log(`FROM: ${data.from} - ${data.msg}`);
});

setTimeout(()=>{
    socket.emit('private-message', {to: 'cesar', msg: 'Lechita'});
}, 2000);

socket.on('broadcast', (data) => {
    console.log(data);
});

socket.emit('create', 'room2');

socket.on('room', (data) => {
    console.log(data);
});
