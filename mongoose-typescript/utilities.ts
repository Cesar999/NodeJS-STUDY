import axios from 'axios';

function randomInitial(){
    const initials = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728];
    return initials[Math.floor(Math.random()*initials.length)];
}

function getRandomId(){
    const MAX_ID = 809;
    return Math.ceil(Math.random()*MAX_ID);
}

async function formatData(data: any){
    const name = data.name;
    const id = data.id;
    let ability = '';
    const moves: Array<any> = [];
    const types: Array<string> = [];

    let index = 0;
    index = Math.floor(Math.random()*data.abilities.length);
    ability = data.abilities[index].ability.name;

    const movesRandom: any = {};
    index = 0;
    
    const urlArray = [];

    try {
        for(let i = 0; i<4; i++){
            index = Math.floor(Math.random()*data.moves.length);
            while(movesRandom[index]) {
                index = Math.floor(Math.random()*data.moves.length);
            }
            movesRandom[index] = true;

            urlArray.push(data.moves[index].move.url);
        }
    } catch(e) {
        console.error(e);
    }

    const promisesArray:any = urlArray.map(url=>axios.get(url));
    let movesPropsArray: any = [];

    try {
        movesPropsArray = await Promise.all(promisesArray);
    } catch(e) {
        console.log(e);
    }

    movesPropsArray.forEach((movesProps:any)=>{
        const movesData = movesProps.data.power +'/'+ movesProps.data.type.name +'/'+movesProps.data['damage_class'].name;
        moves.push(movesProps.data.name +'/'+ movesData);
    });

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