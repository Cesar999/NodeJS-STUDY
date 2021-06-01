
const axios = require('axios');

const getPokemon = (id) => {
    return axios({
        method: 'get',
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
    });
};

const getURL = url => axios.get(url);

module.exports = {
    getPokemon,
    getURL
}

