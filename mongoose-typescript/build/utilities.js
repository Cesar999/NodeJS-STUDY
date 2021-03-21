"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomInitial = exports.formatImageUrl = exports.getRandomId = exports.formatData = void 0;
function randomInitial() {
    const initials = [1, 4, 7, 152, 155, 158, 252, 255, 258, 387, 390, 393, 495, 498, 501, 650, 653, 656, 722, 725, 728];
    return Math.floor(Math.random() * initials.length);
}
exports.randomInitial = randomInitial;
function getRandomId() {
    const MAX_ID = 809;
    return Math.ceil(Math.random() * MAX_ID);
}
exports.getRandomId = getRandomId;
function formatData(data) {
    const name = data.name;
    const id = data.id;
    let ability = '';
    const moves = [];
    const types = [];
    let index = 0;
    index = Math.floor(Math.random() * data.abilities.length);
    ability = data.abilities[index].ability.name;
    const movesRandom = {};
    index = 0;
    for (let i = 0; i < 4; i++) {
        index = Math.floor(Math.random() * data.moves.length);
        while (movesRandom[index]) {
            index = Math.floor(Math.random() * data.moves.length);
        }
        movesRandom[index] = true;
        moves.push(data.moves[index].move.name);
    }
    data.types.forEach((type) => {
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
exports.formatData = formatData;
function formatImageUrl(id) {
    if (id < 10) {
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${id}.png`;
    }
    else if (id < 100) {
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${id}.png`;
    }
    else {
        return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
    }
}
exports.formatImageUrl = formatImageUrl;
