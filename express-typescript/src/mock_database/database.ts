import {Pokemon} from '../utilities/utilities';

const PokemonsArray:Pokemon[] = [
    {   
        name: 'Gengar',
        id: 94,
        ability: 'Cursed-Body',
        moves: ['Zap-Cannon', 'Energy-Ball', 'Explosion', 'Mimic'],
        types: ['Ghost', 'Poison'],
        url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png'
    },
    {   
        name: 'Salamence',
        id: 373,
        ability: 'Intimidate',
        moves: ['Scary-Face', 'Dragon-Claw', 'Hidden-Power', 'Rollout'],
        types: ['Dragon ', 'Flying'],
        url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/373.png'
    },
    {   
        name: 'Zangoose',
        id: 335,
        ability: 'Toxic-Boost',
        moves: ['Thief', 'Close-Combat', 'X-Scissor', 'Thunder'],
        types: ['Normal'],
        url: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/335.png'
    }
];

function getByID(id:number){
    //return PokemonsArray.find(poke => poke.id === id);
    return PokemonsArray[id];
}

function getAll(){
    return PokemonsArray;
}

function insertPoke(newPoke:Pokemon){
    if(PokemonsArray.length<6){
        PokemonsArray.push(newPoke);
        return true;
    } else {
        return false;
    }
}

function removePoke(id:number){
    if(PokemonsArray.length>0&&PokemonsArray.length>=id){
        PokemonsArray.splice(id,1);
        return true;
    } else {
        return false;
    }
}

function replacePoke(newPoke:Pokemon, id:number){
    if(PokemonsArray.length>id){
        PokemonsArray.splice(id,1,newPoke);
        return true;
    } else {
        return false;
    }
}

export {getByID, getAll, insertPoke, removePoke, replacePoke};




