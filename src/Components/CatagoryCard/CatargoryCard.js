import React from 'react';
import "./CatagoryCard.css"
const CatargoryCard = (props) => {
    const { category, img } = props.vehicle;
    const clickHandler = props.clickHandler;
    return (
        <div onClick={()=>clickHandler(category)} className="vehicle-container">
            <img src={img} alt="" />
            <h2>{category}</h2>
        </div>
    );
};

export default CatargoryCard;