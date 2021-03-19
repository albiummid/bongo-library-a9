import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import signIn from "../../images/signIn.jpg";
import signUp from "../../images/signUp.jpg";
import "firebase/auth";
import "./Login.css";
import firebase from "firebase/app";
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


const Login = () => {
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    // console.log("final update", user);
    const [newUser, setNewUser] = useState(false);

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { email, displayName } = result.user;
                const user = { email, name: displayName }
                setLoggedInUser(user);
                history.replace(from);
            }).catch((error) => {
                setLoggedInUser(error.message);
            });

    }

    const handleFbSignIn = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const { email, displayName } = result.user;
                const user = { email, name: displayName }
                setLoggedInUser(user);
                history.replace(from);
            })
            .catch((error) => {
                setLoggedInUser(error);

            });
    }

    const handleGithubSignIn = () => {
        var provider = new firebase.auth.GithubAuthProvider();
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                const credential = result.credential;
                const token = credential.accessToken;
                const { email, displayName } = result.user;
                const user = { email, name: displayName };
                setLoggedInUser(user)
                history.replace(from);
            }).catch((error) => {

                const errorCode = error.code;
                const errorMessage = error.message;
                setLoggedInUser(error);
            });
    }




    const handleChange = (event) => {
        let isFieldValid = true;
        let isPasswordMatched = false;
        console.log("password is", user.password);
        console.log("confirm Password is", user.confirmPassword);
        
       
        // if (event.target.name === 'name')
        
        // {
        //     console.log(event.target.value);
        //     isFieldValid;
        // }

        // 

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (newUser && event.target.name === 'confirmPassword') {
            if (user.password === event.target.value) {
                
            isPasswordMatched = true;
            console.log("matched",isPasswordMatched);
        }
        else {
            alert("pass doesn't Matched");
                event.target.title= "pass not matched"
        }
           
            isFieldValid = isPasswordMatched;
            
        }

        if (isFieldValid) {
            const userInfo = { ...user };
            // console.log("before update userinfo",userInfo);
            userInfo[event.target.name] = event.target.value;
            console.log("after update userInfo",userInfo);
            setUser(userInfo);
        }

    }

    const handleSubmit = () => {
        console.log("clicked");
    }


    return (
        <div className="card-container">
            <div className="sign-card">
                <div className="img-div">
                    {
                        newUser ? <img src={signUp} alt="" /> : <img src={signIn} alt="" />

                    }
                    {
                        newUser ? <button onClick={() => setNewUser(!newUser)}> Already have an account ? </button> :
                            <button onClick={() => setNewUser(!newUser)}> Create an account ? </button>
                    }

                </div>
                <div className="form">
                    <div>
                        {
                            newUser ? <h1>Sign Up</h1> : <h1>Sign In</h1>
                        }
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <FontAwesomeIcon icon={faUser} size="1x" />
                                </span>
                                <input onChange={handleChange} type="text" name="name" placeholder="Name" id="" required />
                            </div>
                        }
                        <div className="input-group">
                            <span>
                                <FontAwesomeIcon icon={faEnvelope} size="1x" />
                                <input onChange={handleChange} type="email" name="email" placeholder="Email" id="" required />
                            </span>
                        </div>
                        <div className="input-group">
                            <span >
                                <FontAwesomeIcon icon={faLock} size="1x" />
                            </span>
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" id="" required />
                        </div>
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <FontAwesomeIcon icon={faLock} size="1x" />
                                </span>
                                <input onBlur={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" id="" required />
                            </div>
                        }
                        <input type="checkbox" name="remember-me" id="checkbox" />
                        <label htmlFor="remember-me">Remember me</label>
                        <p style={{ color: "red" }}>{loggedInUser.error}</p>

                        {
                            newUser ? <button onClick={handleSubmit}  className="submit btn">Submit</button> : <button  className="login btn">Login</button>
                        }
                    </div>

                    {
                        !newUser &&
                        <div className="social-links">
                            {/* <p>Login with social accounts</p> */}
                            <button onClick={handleGoogleSignIn}> <FontAwesomeIcon icon={faGoogle} size="2x" /></button>
                            <button onClick={handleFbSignIn}> <FontAwesomeIcon icon={faFacebook} size="2x" /></button>
                            <button onClick={handleGithubSignIn}> <FontAwesomeIcon icon={faGithub} size="2x" /></button>
                            {/* <button onClick={handleGithubSignIn}> <FontAwesomeIcon icon={faTwitter} size="2x" /></button> */}
                        </div>
                    }
                </div>




            </div>
        </div>
    );
};

export default Login;