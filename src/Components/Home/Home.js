import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import CatargoryCard from '../CatagoryCard/CatargoryCard';
import "./Home.css";


const Home = () => {

    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        const url = "https://api.npoint.io/6b5a64f78b7d4393011c"
        fetch(url)
            .then(res => res.json())
            .then(data => setVehicles(data.bongo))
    }, []);
    const history = useHistory();
    const clickHandler = (name) => {
        const url = `/search-rides/${name}`;
        history.push(url)
    }
    return (
        <div className="home-container">
            <div className="category-holder">

                {
                    vehicles.map(vehicle => <CatargoryCard vehicle={vehicle} key={vehicle.key} clickHandler={clickHandler}></CatargoryCard>)
                }


            </div>
        </div>
    );
};

export default Home;