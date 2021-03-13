// WORKS WITH REACT/example-typescript

import express from 'express'; //require express module
import {getRandomPoke, getAllTeam, getPoke, postPoke, deletePoke, putPoke} from './routes/routes';

const app = express(); //invoke the imported function to create an instance
const port =  process.env.PORT || 3002; //declared a variable to hold the port ot listen, mostly using enviromental variables
app.use(express.json()); //Apply middlewares to express instance

//Declare configuration using a callback function
//Setting the headers like Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials
app.use((req, res, next) => {
    const whitelist = [
        'http://localhost:3000',
        'http://192.168.99.100:3000'
    ];
    const origin = req.headers.origin || '';
    if (whitelist.indexOf(origin) > -1) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.get('/', (req, res) => {
    res.send({
      message: 'hello world',
    });
});

app.get('/getRandomPoke', getRandomPoke);
app.get('/getAllTeam', getAllTeam);
app.get('/getPoke/:id', getPoke);
app.post('/postPoke', postPoke);
app.delete('/deletePoke/:id', deletePoke);
app.put('/putPoke/:id', putPoke);

//use the listen method to asing a port and a callback function
app.listen(port, () => console.info(`App is listening on port ${port}`));

