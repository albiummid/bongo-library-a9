import React from 'react';
import "./CatagoryCard.css"
const CatargoryCard = (props) => {
    const { category, img, key } = props.vehicle;
    const clickHandler = props.clickHandler;
    console.log(key);
    return (
        <div onClick={()=>clickHandler(key)} className="vehicle-container">
            <img src={img} alt="" />
            <h2>{ category}</h2>
        </div>
    );
};

export default CatargoryCard;