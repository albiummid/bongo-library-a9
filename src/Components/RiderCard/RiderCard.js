import React from 'react';
import "./RiderCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
const RiderCard = (props) => {
    const { img, category } = props.selectedVehicle;
    const {cost ,seat} = props.riders;
    return (
        <div className ="rider-card">
            <div className="rider-info">
                <span className = "category-img">< img src={img} alt=""/></span>
                <span>{category}</span>
                <span > <FontAwesomeIcon icon={faUsers} size = "1x" /> <span>{seat}</span> </span>
                
            </div>
            <div className="cost-info">
                    <span>$ {cost}</span>
            </div>
        </div>
    );
};

export default RiderCard;