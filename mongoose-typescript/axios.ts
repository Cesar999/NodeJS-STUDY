import axios from 'axios';
import {formatData, randomInitial} from './utilities';

const getRandomInitial = async () => {
    const id = randomInitial();
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = formatData(result.data);
    return pokemon;
}

const getPokemon = async (id: number) => {
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    const pokemon = formatData(result.data);
    return pokemon;
}

export {getRandomInitial, getPokemon}