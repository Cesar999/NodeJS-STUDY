import React from "react";
import { render } from "react-dom";
import CardsContainer from './components/CardsContainer';
import 'regenerator-runtime/runtime.js';
import './styles/main.scss';
import {display} from './components/display.ts';

function importAll(r) {
    return r.keys().map(r);
}

const images = importAll(require.context('./assets', false, /\.(png|jpe?g|svg)$/));
render(<CardsContainer images={images} display={display}/>, document.getElementById("root"));
