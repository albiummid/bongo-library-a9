import React, { useContext } from 'react';
import "./Header.css";
import logo from '../../images/Urban Riders.png';
import menuIcon from '../../images/menu.png';
import { UserContext } from '../../App';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser);
    const history = useHistory();
    const handleSignIn = () => {
        history.replace("/login")
    } 
    return (
        <div className="header">
            <div className="navbar">
                <Link to="/home"> <img src={logo} className="logo" alt="" /> </Link>
                
                <nav>
                    <ul>
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/search-ridies">Destinations</Link></li>
                        <li><Link to="/">Blog</Link></li>
                        <li><Link to="/">Contact With Us</Link></li>
                        {
                            <li className="userName">{ loggedInUser.name}</li>
                        }
                        <li>
                        {
                        loggedInUser.name? <button className="btn" onClick={()=> setLoggedInUser({})}>Sign Out</button> : <button className="btn" onClick = {handleSignIn} >Sign In</button>
                    }
                       </li>
                       
                    </ul>
                   
                </nav>
                <img src={menuIcon} className="menu-icon" alt="" />
            </div>
        </div>
        
    );
};

export default Header;