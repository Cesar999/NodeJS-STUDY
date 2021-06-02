const WebSocket = require('ws');

const serverAddress = 'ws://localhost:5000';

const socket = new WebSocket(serverAddress);

socket.on('open', ()=>{
    socket.send(JSON.stringify({to: 1, msg: 'hello there!'}));
});

socket.on('message', (msg)=>{
    console.log('Received msg from the server: ' + msg);
});

