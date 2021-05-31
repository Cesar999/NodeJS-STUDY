const {getRandomPokemon_request} = require('./api');
const {formatPokemon, randomTotal, randomInitial} = require('./utilities');

const getRandomPokemon = async (req, res) => {
    const randomNum = randomTotal();
    const {data} = await getRandomPokemon_request(randomNum);
    const pokemon = await formatPokemon(data);
    req.app.locals['current_pokemon'] = pokemon;
    res.status(200).send({data: pokemon});
}   

const getCurentPokemon = async (req, res) => {
    const pokemon = req.app.locals['current_pokemon'];
    res.status(200).send({data: pokemon});
}

const createTrainer = async (req, res) => {
    const randomNum = randomInitial();
    const {data} = await getRandomPokemon_request(randomNum);
    const pokemon = await formatPokemon(data);

    const {name} = req.body;
    const trainer = {name};

    const query_1 = () => new Promise (resolve => {
        const sql_1 = "INSERT INTO trainers SET ?";
        req.app.locals.db.query(sql_1, trainer, function(err, result) {
            if (err) throw err;
            resolve(result.insertId);
        }); 
    });

    const trainer_id = await query_1();

    const newPokemon = {...pokemon, trainer_id};

    const sql_2 = "INSERT INTO pokemon SET ?";
    await req.app.locals.db.query(sql_2, newPokemon, function(err, result) {
        if (err) throw err;
    });

    res.status(200).send({data: {newPokemon, trainer}});
};

const setCurrentTrainer =  async (req, res) => {
    const {id} = req.params;

    const query_1 = (id) => new Promise (resolve => {
        const sql_1 = "SELECT id FROM trainers WHERE ?"
        req.app.locals.db.query(sql_1, {id}, function(err, result) {
            if (err) throw err;
            resolve(result);
        });
    });

    const result = await query_1(id);

    if(result.length>0) {
        const trainer = {id: result[0].id}
        req.app.locals['current_trainer'] = trainer;
        res.status(200).send(trainer);
    } else {
        res.status(200).send({id: null});
    }

};

const getCurentTrainer = async (req, res) => {
    const trainer = req.app.locals['current_trainer'];
    res.status(200).send({data: trainer});
}

const catchPokemon  = async (req, res) => {
    const trainer = req.app.locals['current_trainer'];
    const pokemon = req.app.locals['current_pokemon'];

    const newPokemon = {...pokemon, trainer_id: trainer.id};

    
    const query_0 = () => new Promise (resolve => {
        const sql_0 = "SELECT COUNT(*) AS total FROM pokemon WHERE trainer_id = ? ";
        req.app.locals.db.query(sql_0, trainer.id, function(err, result) {
            if (err) throw err;
            resolve(result[0]);
        });
    });

    const num_pokes = await query_0();

    if(num_pokes.total >= 6) {
        res.status(200).send({pokemonID: null, msg: 'The Trainer Cannot Catch More than 6 Pokemon'});
    } else {
        const query_1 = () => new Promise (resolve => {
            const sql_1 = "INSERT INTO pokemon SET ?";
            req.app.locals.db.query(sql_1, newPokemon, function(err, result) {
                if (err) throw err;
                resolve(result.insertId);
            });
        });
    
        const pokemonID = await query_1();
    
        res.status(200).send({pokemonID});
    }

}

const getTrainerPokemon = async (req, res) => {
    
    const query_1 = (id) => new Promise (resolve => {
        const {id} = req.app.locals['current_trainer'];
        const sql_1 = "SELECT trainers.name AS trainer, pokemon.name AS pokemon, pokemon.level AS level, pokemon.types AS type, pokemon.ability AS ability FROM trainers JOIN pokemon ON trainers.id = pokemon.trainer_id WHERE trainers.id = ?";
        req.app.locals.db.query(sql_1, id, function(err, result) {
            if (err) throw err;
            resolve(result);
        });
    });

    const pokemon = await query_1();
    res.status(200).send({data: pokemon});
}

module.exports = {
    getRandomPokemon,
    getCurentPokemon,
    createTrainer,
    setCurrentTrainer,
    getCurentTrainer,
    catchPokemon,
    getTrainerPokemon
}