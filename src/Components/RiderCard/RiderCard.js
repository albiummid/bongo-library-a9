import React from 'react';
import "./RiderCard.css";
import peopleIcon from "../../images/peopleicon.png"
const RiderCard = (props) => {
    const { img, category } = props.selectedVehicle;
    const {cost ,seat} = props.riders;
    // console.log(riders);


    console.log(img);
    return (
        <div className ="rider-card">
            <div className="rider-info">
                <span className = "category-img">< img src={img} alt=""/></span>
                <span>{category}</span>
                <span className="peopleicon" > <img src={peopleIcon} alt="" /> <span>{seat}</span> </span>
                
            </div>
            <div className="cost-info">
                    <span>$ {cost}</span>
            </div>
        </div>
    );
};

export default RiderCard;