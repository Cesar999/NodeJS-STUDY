import React from "react";

function Card(props) {

    const gradient = props.gradient;
    const myStyle = {
        background: gradient
    };

    const myImg = <img className="image" src={props.url} style={myStyle}></img>;

    return (
        <div className="Card" key={props.id}>
        {props.id? 
        <>
            <div className="title">
                <h1 className="name">{props.name}</h1>
                <p className="pokeId">{props.id}</p>
            </div>
            <div className="image-wrapper">
                {myImg}
            </div>
            <p className="ability">Ability: {props.ability}</p>
            <p className="types">
                {props.types.length > 1 ? 'Types: ':'Type: '}
                {props.types.map((type)=>type).join(' ')}
            </p>
            <ul className="moves">
                {props.moves.map((move, index)=><li key={index}>{move}</li>)}
            </ul>
        </>
        : null}
    </div>
    );
}

export default Card;