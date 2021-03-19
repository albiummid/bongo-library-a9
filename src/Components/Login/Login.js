import React, { useContext, useState } from 'react';
import firebaseConfig from './firebase.config';
import signIn from "../../images/signIn.jpg";
import signUp from "../../images/signUp.jpg";
import "firebase/auth";
import "./Login.css";
import firebase from "firebase/app";
import { faLock, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook,  faGithub } from '@fortawesome/free-brands-svg-icons';
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
                console.log(result);
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
                const newUserInfo = {}
                newUserInfo.error = error.message;
                setLoggedInUser(newUserInfo);

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
        console.log(isPasswordMatched);
        console.log("password is", user.password);
        console.log("confirm Password is", user.confirmPassword);


        if (event.target.name === 'name') {
            isFieldValid = true;
        }

        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value)
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if (newUser && event.target.name === 'confirmPassword') {
            if ( event.target.value === user.password ) {
                isPasswordMatched = true;
                const isPasswordValid = event.target.value.length > 6;
            const isPasswordHasNumber = /\d{1}/.test(event.target.value)
                isFieldValid = isPasswordMatched && isPasswordValid && isPasswordHasNumber;
            }
        }

        if (isFieldValid) {
            const userInfo = { ...user };
            userInfo[event.target.name] = event.target.value;
            console.log("after update userInfo", userInfo);
            setUser(userInfo);
        }

    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const { email, displayName } = res.user;
                const newUserInfo = { email, name: displayName };
                newUserInfo.error = '';
                setLoggedInUser(newUserInfo)
                history.replace(from);
                alert('SignUp successfully completed 😍')
            })
            .catch((error) => {
                const newUserInfo = {};
                newUserInfo.error = error.message;
                setLoggedInUser(newUserInfo); 
            });
        }
        if (!newUser && user.email && user.password) {
            console.log("cliked on login");
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res => {
    
      const { email, displayName } = res.user;
      const newUserInfo = {email,name:displayName}
      console.log("User", res.user);
      newUserInfo.error = '';
      setLoggedInUser(newUserInfo);
      alert("login successful")
      history.replace(from)
   
  })
  .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      setLoggedInUser(newUserInfo);
      alert("not logged in")
  });
        }
        event.preventDefault();
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
                <form onSubmit ={handleSubmit}>
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
                                <input onChange={handleChange} type="text" name="name" placeholder="Name"  required minLength="4" />
                            </div>
                        }
                        <div className="input-group">
                            <span>
                                <FontAwesomeIcon icon={faEnvelope} size="1x" /> 
                            </span>
                            <input onChange={handleChange} type="email" name="email" placeholder="Email" required />
                        </div>
                        <div className="input-group">
                            <span >
                                <FontAwesomeIcon icon={faLock} size="1x" />
                            </span>
                            <input onChange={handleChange} type="password" name="password" placeholder="Password" minLength="6" required />
                        </div>
                        {
                            newUser &&
                            <div className="input-group">
                                <span >
                                    <FontAwesomeIcon icon={faLock} size="1x" />
                                </span>
                                <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" minLength="6" required />
                                {
                                    user.confirmPassword !==user.password && <p style={{color:"red"}}>Passwords are not same</p>
                                }
                            </div>
                        }
                        <input type="checkbox" name="remember-me" id="checkbox" />
                        <label htmlFor="remember-me">Remember me</label>
                        <p style={{ color: "red" }}>{loggedInUser.error}</p>

                        {
                            !newUser && <input className="btn" type="submit" value="Sign In"/>  
                        }
                        {
                          newUser &&  user.password === user.confirmPassword && <input className="btn" type="submit" value="Submit"/>
                        }

                        
                    </div>

                    {
                        !newUser &&
                        <div className="social-links">
                            <button onClick={handleGoogleSignIn}> <FontAwesomeIcon icon={faGoogle} size="2x" /></button>
                            <button onClick={handleFbSignIn}> <FontAwesomeIcon icon={faFacebook} size="2x" /></button>
                            <button onClick={handleGithubSignIn}> <FontAwesomeIcon icon={faGithub} size="2x" /></button>
                        </div>
                    }
                </form>

            </div>
        </div>
    );
};

export default Login;