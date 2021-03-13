function formatData(data){
    const name = data.name;
    const id = data.id;
    let ability = '';
    const moves = [];
    const types = [];

    let index = 0;
    index = Math.floor(Math.random()*data.abilities.length);
    ability = data.abilities[index].ability.name;

    const movesRandom = {};
    index = 0;
    
    for(let i = 0; i<4; i++){
        index = Math.floor(Math.random()*data.moves.length);
        while(movesRandom[index]) {
            index = Math.floor(Math.random()*data.moves.length);
        }
        movesRandom[index] = true;
        moves.push(data.moves[index].move.name);
    }

    data.types.forEach(type =>{
        types.push(type.type.name);
    });

    const myPoke = {
        name,
        id,
        ability,
        moves,
        types
    };
    
    return myPoke;
}

function getGradient(types, deg = 135){
    const colors = {
        ghost: '#1f2077',
        poison: '#9718b1',
        fire: '#ff6600',
        fighting: '#c51515',
        dark: '#363636',
        flying: '#aa8be4',
        ground: '#85462d',
        dragon: '#583099',
        normal: '#ebd6f0',
        rock: '#ac7a42',
        bug: '#679c43',
        steel: '#929292',
        water: '#3d68f8',
        grass: '#35b10f',
        electric: '#deec1c',
        psychic: '#e20bac',
        ice: '#88effd',
        fairy: '#fd88e0'
    };
    if(types.length === 2) {
        return `linear-gradient(${deg}deg, ${colors[types[0]]}, ${colors[types[1]]}`;
    } else {
        return `linear-gradient(${deg}deg, ${colors[types[0]]} 66%, white`;
    }
}

export {formatData, getGradient};