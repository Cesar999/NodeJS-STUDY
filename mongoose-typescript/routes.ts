import mongoose from 'mongoose';
import {Trainer, Pokemon} from './schemas';
import { getRandomInitial, getPokemon } from './axios';
import { getRandomId } from './utilities';

async function createTrainer(req: any, res: any) {
    try {
        const {name, age} = req.body;
        const trainer_id = new mongoose.Types.ObjectId();
        const pokemon_id = new mongoose.Types.ObjectId();
    
        const initial = await getRandomInitial();
        const newPokemon = new Pokemon({...initial, trainer: trainer_id, _id: pokemon_id});
        const newPokemonSaved = await newPokemon.save();
    
        const newTrainer = new Trainer({name, age, team:[pokemon_id]})
        const newTrainerSaved = await newTrainer.save();
    
        if(newPokemonSaved && newTrainerSaved) {
            res.status(200).send({msg: 'Trainer Saved', data: newTrainerSaved});
        } else {
            res.status(200).send({msg: 'Trainer Not Saved', data: null});
        }
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }

}

async function getTrainer(req: any, res: any) {
    try {
        const {name} = req.params;
        const trainer = await Trainer.findOne({name})
        .select('name age team')
        .populate({
          path: 'team',
          select: 'name id _id ability types moves',
          model: 'pokemon'
        });
        if(trainer) {
            res.status(200).send({msg: 'Trainer Found', data: trainer});
        } else {
            res.status(200).send({msg: 'Trainer Not Found', data: null});
        }
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }
}

async function savePokemon(req: any, res: any) {
    try {
        const {trainerName: name, pokemonID: id} = req.body;

        const trainer = await Trainer.findOne({name});
    
        if(trainer.team.length<6){
            const data = await getPokemon(id);
            const newPokemon = new Pokemon({...data, trainer: trainer._id});
            const newPokemonSaved = await newPokemon.save();
            await Trainer.updateOne({name}, { $push: {team: newPokemonSaved._id}});
            if(newPokemonSaved) {
                res.status(200).send({msg: 'Pokemon Saved', data: newPokemonSaved});
            } else {
                res.status(200).send({msg: 'Pokemon Not Saved', data: null});
            }
        } else {
            res.status(200).send({msg: 'Pokemon Not Saved', data: null});
        }
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }
}

async function deletePokemon(req: any, res: any){
    try {
        const {trainerName: name} = req.body;
        const {pokemonID: id} = req.body;
    
        const trainer = await Trainer.findOne({name});
        const pokemon = await Pokemon.findOne({id});
    
        if(!pokemon){
            res.status(200).send({msg: 'Pokemon Not Found', data: null});
        } else {
            const deletedPokemon = await Pokemon.deleteOne({id, trainer: trainer._id});
            await Trainer.updateOne({name}, { $pull: {team: pokemon._id}});
        
            if(deletedPokemon) {
                res.status(200).send({msg: 'Pokemon Removed', data: null});
            } else {
                res.status(200).send({msg: 'Pokemon Not Removed', data: null});
            }
        }
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }
}

async function getRandomPokemon(req: any, res: any){
    try {
        const id = getRandomId();
        const data = await getPokemon(id);
        res.status(200).send({msg: 'Pokemon Gotten', data});
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }
}

async function getAllTrainers(req: any, res: any) {
    try {
        const trainers = await Trainer.find({});
        res.status(200).send({msg: 'Trainers Gotten', data: trainers});
    } catch(e) {
        console.error(e);
        res.status(200).send({msg: 'Server Error', data: null});
    }
}

export {createTrainer, getTrainer, savePokemon, deletePokemon, getRandomPokemon, getAllTrainers}
