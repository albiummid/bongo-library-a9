import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useState } from 'react';
import Header from './Components/Header/Header';
import NoMatch from './Components/NoMatch/NoMatch';
import Home from './Components/Home/Home';
import SearchRidies from './Components/SearchRidies/SearchRidies';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    
      <Router>
      <Header/>
      <Switch>
       
        <Route path="/home">
          <Home/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/search-ridies/:id">
          <SearchRidies/>
        </PrivateRoute>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="*">
          <NoMatch/>
        </Route>

      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
