const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");
const {getPokemon} = require('../api');
const {formatPokemon, randomTotal} = require('../utilities');
const db = require('../database');
const Pokemon = db.pokemon;
const Trainer = db.trainer;
const {sequelize} = db;

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

router.get('/trainer/:id', async (req, res) => {
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

router.get('/maxlevel', async (req, res) => {
    const maxLevel = await Pokemon.findAll({
        attributes: ['trainer.name', 'name', [sequelize.fn('max', sequelize.col('level')), 'maxLevel']],
        include : [
            {
              model : Trainer,
            }
        ]
    });
    //const maxLevel = await Pokemon.max('level');
    res.status(200).send(maxLevel[0].dataValues);
});

router.get('/countpokemon', async (req, res) => {
    const countPokemon = await Pokemon.findAll({
        attributes: ['trainer_id', [sequelize.fn('count', sequelize.col('trainer_id')), 'countPokemon']],
        include : [
            {
              model : Trainer,
            }
        ],
        group : ['trainer.id'],
        order: sequelize.literal('countPokemon DESC')
    });
    res.status(200).send(countPokemon);
});

router.get('/maxcountpokemon', async (req, res) => {
    const countPokemon = await Pokemon.findAll({
        attributes: ['trainer_id', [sequelize.fn('count', sequelize.col('trainer_id')), 'countPokemon']],
        include : [
            {
              model : Trainer,
            }
        ],
        group : ['trainer.id'],
        having: sequelize.where(sequelize.fn('count', sequelize.col('countPokemon')), {[Op.gte]: 6}) //,'>=', 6
    });
    res.status(200).send(countPokemon);
});

module.exports = router;
