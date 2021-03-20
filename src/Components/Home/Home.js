import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import CatargoryCard from '../CatagoryCard/CatargoryCard';
import background from "../../images/Bg.png"
import "./Home.css";


const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        const url = "https://api.npoint.io/6b5a64f78b7d4393011c"
        fetch(url)
            .then(res => res.json())
            .then(data => setVehicles(data.bongo))
    }, []);
    console.log(vehicles);
    const history = useHistory();
    const clickHandler = (id) => {
        const url = `/search-ridies/${id}`;
        history.push(url)
    }
    return (
        <div className="home-container">
            <img className="background" src={background} alt=""/>
            <div className="category-holder">

            {
                vehicles.map(vehicle => <CatargoryCard vehicle={vehicle} key={vehicle.key} clickHandler = {clickHandler}></CatargoryCard> )
                }
                

           </div>
        </div>
    );
};

export default Home;