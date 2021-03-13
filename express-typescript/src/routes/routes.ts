import {getData} from '../api/api';
import {formatData, getRandomId} from '../utilities/utilities';
import {getByID, getAll, insertPoke, removePoke, replacePoke} from '../mock_database/database';
import {Pokemon} from '../utilities/utilities';

async function getRandomPoke(req:any, res:any){
    const response:any = await getData(getRandomId());
    const poke = formatData(response.data);
    res.status(200).send({...poke});
}

function getAllTeam(req:any, res:any){
    res.status(200).send({team: getAll()});
}

function getPoke(req:any, res:any){
    const id = req.params.id;
    const myPoke = getByID(id);
    res.status(200).send({...myPoke});
}

function postPoke(req:any, res:any){
    const flag = insertPoke(req.body);
    res.status(200).send({flag});
}

function deletePoke(req:any, res:any){
    const id = req.params.id;
    const flag = removePoke(id);
    res.status(200).send({flag});
}

function putPoke(req:any, res:any){
    const newPoke:Pokemon = req.body;
    const id = req.params.id;
    const flag = replacePoke(newPoke, id);
    res.status(200).send({flag});
}

export {getRandomPoke, getAllTeam, getPoke, postPoke, deletePoke, putPoke};
