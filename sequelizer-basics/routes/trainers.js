const express = require('express');
const router = express.Router();
const {getPokemon} = require('../api');
const {formatPokemon, randomInitial} = require('../utilities');
const db = require('../database');
const Trainer = db.trainer;
const Pokemon = db.pokemon;

router.post('/create', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const {name} = req.body;
        const newTrainer = await Trainer.create({name}, {transaction});

        const randomNum = randomInitial();
        const {data} = await getPokemon(randomNum);
        const pokemon = await formatPokemon(data);
        const newPokemon = {...pokemon, trainer_id: newTrainer.id};
        const createdPokemon = await Pokemon.create(newPokemon, {transaction});

        await transaction.commit();

        res.status(200).send({trainer: newTrainer, pokemon: createdPokemon});
      } catch(err) {
        console.log(err);
        await transaction.rollback();
        res.status(200).send({msg: 'Error'});
    }

});

module.exports = router;