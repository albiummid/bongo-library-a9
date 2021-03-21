import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Map from '../Map/Map';
import RiderCard from '../RiderCard/RiderCard';
import "./SearchRides.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'

const SearchRidies = () => {
    const [route, setRoute] = useState({
        from: "",
        to: ""
    });
    const [isSearched, setIsSearched] = useState(false);
    const { name } = useParams();
    const [selectedVehicle, setSelectedVehicles] = useState([])
    useEffect(() => {
        const url = "https://api.npoint.io/6b5a64f78b7d4393011c"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const dataObj = data.bongo;
                const matchedObject = dataObj.find(vehicle => vehicle.category === name);
                setSelectedVehicles(matchedObject);
            })

    }, [name]);

    const handleChange = (event) => {

        const location = { ...route };
        if (event.target.name === "from") {
            location.from = event.target.value;
            setRoute(location);
        }
        if (event.target.name === "to") {
            location.to = event.target.value;
            setRoute(location);
        }
        if (event.target.name === "date") {
            location.bookingDate = event.target.value;
            setRoute(location);
        }
    }

    return (
        <div className="search-div">
            {!isSearched &&
                <form onSubmit={()=>setIsSearched(!isSearched)} className="pickForm">
                    <div className="input-group">
                        <span>
                            Pick From:
                            </span>
                        <input onChange={handleChange}  type="text" name="from" placeholder="<< Location From " required />
                    </div>
                    <div className="input-group">
                        <span>
                            Pick To:
                            </span>
                        <input onChange={handleChange} type="text" name="to" placeholder="Location to >>" required />
                    </div>
                    <div className="input-group">
                        <span>
                            Booking Date:
                            </span>
                        <input onChange={handleChange} type="date"  name="date" required />
                    </div>
                    <input className="btn-search" type="submit" value="Search" />
                </form>}
            { isSearched &&
                <div className="search-results">
                    <div className="route-info">
                        <h3> From : <span>{route.from}</span></h3>
                        <p><FontAwesomeIcon icon={faLongArrowAltDown} size = "2x" /></p>
                    <h3> To :  <span>{route.to} </span></h3>
                    
                    <h4> Booking Date : <span> { route.bookingDate}</span></h4>
                        <button onClick={() => setIsSearched(!isSearched)} className="btn-search">Back</button>
                    </div>
                    {
                        selectedVehicle?.riders?.map(riders => <RiderCard selectedVehicle={selectedVehicle} riders={riders}   ></RiderCard>)
                    }

                </div>
            }


            <div className="map">
                <Map></Map>
            </div>
        </div>
    );
};

export default SearchRidies;