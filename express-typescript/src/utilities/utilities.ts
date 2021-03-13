interface Pokemon {
    name:string, 
    id:number, 
    ability: string
    types: string[],
    moves: string[]
    url: string
}

function getRandomId(){
    const MAX_ID = 809;
    return Math.ceil(Math.random()*MAX_ID);
}

function formatImageUrl(id: number){
    if(id<100){
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`;
    } else {
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    }
}

function formatData(data:any){
    const name:string = data.name;
    const id:number = data.id;
    let ability:string = '';
    const moves:string[] = [];
    const types:string[] = [];

    let index:number = 0;
    index = Math.floor(Math.random()*data.abilities.length);
    ability = data.abilities[index].ability.name;

    const movesRandom:any = {};
    index = 0;
    
    for(let i = 0; i<4; i++){
        index = Math.floor(Math.random()*data.moves.length);
        while(movesRandom[index]) {
            index = Math.floor(Math.random()*data.moves.length);
        }
        movesRandom[index] = true;
        moves.push(data.moves[index].move.name);
    }

    data.types.forEach((type:any) =>{
        types.push(type.type.name);
    });

    const url = formatImageUrl(id);

    const myPoke:Pokemon = {
        name,
        id,
        ability,
        moves,
        types,
        url
    };
    
    return myPoke;
}

export {
    Pokemon,
    getRandomId,
    formatImageUrl,
    formatData
}