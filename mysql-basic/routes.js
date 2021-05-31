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

const trainerCustomPokemon = async (req, res) => {
    const con = req.app.locals.db;
    const trainerName = req.params.name;
    const pokeNum = req.params.poke;

    const {data} = await getRandomPokemon_request(pokeNum);
    const pokemon = await formatPokemon(data);

    const query_0 = () => new Promise (resolve => {
        con.beginTransaction((err)=>{
            if(err) { throw err; }
            resolve(true);
        });
    });

    const query_1 = (q) => new Promise (resolve => {
        con.query('INSERT INTO trainers SET ?', {name: trainerName}, function (error, results, fields) {
            if (error) {
              return con.rollback(function() {
                throw error;
              });
            }
            console.log(`query_0: ${q} from query_1`);
            resolve(results.insertId);
        });
    });

    const query_2 = (q) => new Promise (resolve => {
        con.query('INSERT INTO pokemon SET ?', {...pokemon, trainer_id: q}, function (error, results, fields) {
            if (error) {
              return con.rollback(function() {
                throw error;
              });
            }
            console.log(`query_1: ${q} from query_2`);
            resolve(results.insertId);
        });
    });

    const query_3 = (q) => new Promise (resolve => {
        con.commit(function(err) {
            if (err) {
              return con.rollback(function() {
                throw err;
              });
            }
            console.log(`query_2: ${q} from query_3`);
            resolve('success!');
          });
    });

    const q0 = await query_0();
    const q1 = await query_1(q0);
    const q2 = await query_2(q1);
    const q3 = await query_3(q2);

    console.log(q3);
    res.status(200).send({msg: q3});
}

module.exports = {
    getRandomPokemon,
    getCurentPokemon,
    createTrainer,
    setCurrentTrainer,
    getCurentTrainer,
    catchPokemon,
    getTrainerPokemon,
    trainerCustomPokemon
}