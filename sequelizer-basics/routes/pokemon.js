const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const {getPokemon} = require('../api');
const {formatPokemon, randomTotal} = require('../utilities');
const db = require('../database');
const Pokemon = db.pokemon;
const Trainer = db.trainer;

router.get('/random', async (req, res) => {
    const randomNum = randomTotal();
    const {data} = await getPokemon(randomNum);
    const pokemon = await formatPokemon(data);
    req.app.locals['current_pokemon'] = pokemon;
    res.status(200).send({data: pokemon});
});

router.get('/current', async (req, res) => {
    const pokemon = req.app.locals['current_pokemon'];
    res.status(200).send({data: pokemon});
});

router.post('/catch', async (req, res) => {
    const pokemon = req.app.locals['current_pokemon'];
    const {id} = req.body;
    const newPokemon = {...pokemon, trainer_id: id};
    const catchedPokemon = await Pokemon.create(newPokemon);
    req.app.locals['current_pokemon'] = null;
    res.status(200).send({data: catchedPokemon});
});

router.get('/:id', async (req, res) => {
    const trainerID = req.params.id;
    const rows = await Trainer.findAll({
        where: {
            id: trainerID
        },
        include: {
            model: Pokemon
        }
      });
    res.send(rows[0]);
});

module.exports = router;