function randomInitial(){
    const initials = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728];
    return initials[Math.floor(Math.random()*initials.length)];
}

function getRandomId(){
    const MAX_ID = 809;
    return Math.ceil(Math.random()*MAX_ID);
}

function formatData(data: any){
    const name = data.name;
    const id = data.id;
    let ability = '';
    const moves: Array<string> = [];
    const types: Array<string> = [];

    let index = 0;
    index = Math.floor(Math.random()*data.abilities.length);
    ability = data.abilities[index].ability.name;

    const movesRandom: any = {};
    index = 0;
    
    for(let i = 0; i<4; i++){
        index = Math.floor(Math.random()*data.moves.length);
        while(movesRandom[index]) {
            index = Math.floor(Math.random()*data.moves.length);
        }
        movesRandom[index] = true;
        moves.push(data.moves[index].move.name);
    }

    data.types.forEach((type: any) =>{
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


export {formatData, getRandomId, randomInitial};