import express from 'express'
import { connectWithRetry } from './database';
import { createTrainer, getTrainer, savePokemon, deletePokemon, getRandomPokemon, getAllTrainers} from './routes';

//Coonect to DataBase
connectWithRetry();

//Server Express
const app = express();
app.use(express.json());

const port = 3002;

app.use((req, res, next) => {
    const whitelist = [
        'http://localhost:3000'
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

app.listen(port, () => {
    console.log(`Server On Port ${port}`);
});

//Routes
app.post('/createTrainer', createTrainer);
app.get('/getTrainer/:name', getTrainer);
app.post('/savePokemon', savePokemon);
app.post('/deletePokemon', deletePokemon);
app.get('/getRandomPokemon', getRandomPokemon);
app.get('/getAllTrainers', getAllTrainers);