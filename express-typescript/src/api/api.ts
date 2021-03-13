import axios from 'axios';

function getData(id:number) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
}
  
export {getData};

