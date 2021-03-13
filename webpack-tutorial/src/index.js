import "./style.css";
import "./style.scss";
import { render } from "react-dom";
import React, { useState } from "react";
import moment from "moment";
const getUserModule = () => import(/* webpackChunkName: "usersAPI" */ "./usersAPI");

const user = {
    name: 'Cesar',
    age: 28
}

function display({name, age}){
    const output = `Hi my name is ${name} and I'm ${age} years old`;
    console.log(output);
    return output;
}

const msg = document.querySelector('#msg');
msg.textContent = display(user);


function App() {
    const [state, setState] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
    return (
    <>
        <h2>{state}</h2>
        <button onClick={() => setState(moment().format('MMMM Do YYYY, h:mm:ss a'))}>Get Time</button>
    </>
    );
}

render(<App />, document.getElementById("root"));

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  getUserModule().then(({ getUsers }) => {
    getUsers().then(json => console.log(json));
  });
});