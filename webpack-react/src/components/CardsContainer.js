import React, { Component } from "react";
import Card from './Card';
import {getData} from './api';
const myUtilities =  () => import(/* webpackChunkName: "utilities" */ './utilitites');

class CardsContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            poke: {
                name: '',
                id: 0,
                ability: '',
                types: [],
                moves: [],
                url: ''
            }
        }
        this.ids = [94, 373, 335, 198, 34, 392];
    }

    componentDidMount(){
        // this.handleGetCard();
    }

    getRandomCard = () => {
        const randCalc = () => this.ids[Math.floor(Math.random()*this.ids.length)];
        let random = randCalc();
        while(this.state.poke.id === random){
            random = randCalc();
        }
        return random;
    }
 
    getImageURL = (name) => {
        const formatName = name[0].toUpperCase() + name.substr(1);
        const url = this.props.images.find(element => element.includes(formatName));
        return url;
    }

    handleGetCard = async () => {
        myUtilities()
        .then(async ({formatData, getGradient})=>{
            const id = this.getRandomCard();
            const data = await getData(id);
            const poke = formatData(data);
            const url = this.getImageURL(poke.name);
            this.setState({poke: {...poke, url, gradient: getGradient(poke.types)}}, ()=>{
                this.props.display(poke);
            });
        })
    }

    render(){
        return (
            <div className="CardsContainer">
                <button onClick={this.handleGetCard}>Get Card</button>
                <Card key={this.state.poke.id} {...this.state.poke}/>
            </div>
        )
    }
}

export default CardsContainer;