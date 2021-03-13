interface Pokemon {
    name:string, 
    id:string, 
    ability: string
    types: string[],
    moves: string[]
}

function display(poke:Pokemon){
    console.log(poke);
}

export {display};