const WebSocket = require('ws');

const PORT = 5000;

const wsServer = new WebSocket.Server({port: PORT});

const CLIENTS = [];

wsServer.on('connection', socket => {
    console.log('New Client Connected!');
    CLIENTS.push(socket);

    socket.on('message', (msg)=>{
        const res = JSON.parse(msg);
        console.log('Recieve message from client: ' + res.msg);
        const id = CLIENTS.indexOf(socket);

        wsServer.clients.forEach((client)=>{
            client.send('client: ' + id + ' said: ' + res.msg);
        });

        if(res.to === id){
            socket.send('this is a secret ' + id);
        }

    })

});

console.log((new Date() + "Server is listening on port " + PORT));
