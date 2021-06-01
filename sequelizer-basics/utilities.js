const {getURL} = require('./api');

function randomInitial(){
    const initials = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728, 810, 813, 816];
    return initials[Math.floor(Math.random()*initials.length)];
}

function randomTotal(){
    const max = 898;
    return Math.floor(Math.random() * max);
}

async function formatPokemon(data){
    const pokeTypes = data.types.map((type)=>{
        return type['type']['name'];
    });
    
    const {name, id} = data;
    
    let index = 0;
    index = Math.floor(Math.random()*data.abilities.length);
    const ability = data.abilities[index].ability.name;

    const moves = [];
    const urlArray = [];
    let randomIndexes = [];
    index = 0;
    try {
        for(let i=0; i<data.moves.length; i++){
            randomIndexes.push(i);
        }
        randomIndexes = randomIndexes.sort(() => Math.random() - 0.5);
        for(let i = 0; i<4; i++){
            urlArray.push(data.moves[randomIndexes[i]].move.url);
        }
    } catch(e) {
        console.error(e);
    }
    const promisesArray = urlArray.map(url=>getURL(url));
    let movesPropsArray = [];

    try {
        movesPropsArray = await Promise.all(promisesArray);
    } catch(e) {
        console.log(e);
    }

    movesPropsArray.forEach((movesProps)=>{
        const movesData = movesProps.data.power +'|'+ movesProps.data.type.name +'|'+movesProps.data['damage_class'].name;
        moves.push(movesProps.data.name +'|'+ movesData);
    });
    
    return {name, dex: id, types: JSON.stringify(pokeTypes), ability, moves: JSON.stringify(moves), level: Math.floor(Math.random() * 100)};
}

module.exports = {
    randomInitial,
    randomTotal,
    formatPokemon
}