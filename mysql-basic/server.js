const express = require('express');
const {connect} = require('./database');
const {getRandomPokemon, getCurentPokemon, createTrainer, setCurrentTrainer, getCurentTrainer, catchPokemon, getTrainerPokemon, trainerCustomPokemon} = require('./routes');

const app = express();
app.use(express.json());

const port =  process.env.PORT || 3002;
connect(app);

app.listen(port, () => console.log(`App is listening on port ${port}`));

app.get('/getRandomPokemon', getRandomPokemon);
app.get('/getCurentPokemon', getCurentPokemon);
app.post('/createTrainer', createTrainer);

app.post('/setCurrentTrainer/:id', setCurrentTrainer);
app.get('/getCurentTrainer', getCurentTrainer);

app.get('/catchPokemon', catchPokemon);
app.get('/getTrainerPokemon', getTrainerPokemon);

app.get('/trainerCustomPokemon/:name/:poke', trainerCustomPokemon);