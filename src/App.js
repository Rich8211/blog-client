import React, {useState, useEffect} from 'react';
import { UserContext } from './context/userContext';
import { UtilContext } from './context/utilContext';
import axios from 'axios';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Post from './Pages/Post/Post';
import Posts from './Pages/Posts/Posts';
import LoginModal from './components/Modal/LoginModal/LoginModal';
import PostModal from './components/Modal/PostModal/PostModal';
import SignUpModal from './components/Modal/SignUpModal/SignUpModal';

import './App.css';

function App() {
  
  const [user, setUser] = useState({
    username:'',
    id:''
  });

  const [modal, setModal] = useState('');

  

  useEffect(() => {
    const checkLoggedIn = async () => {
      const userRes = await axios.get('http://localhost:5000/users/user', {withCredentials: true});
      if (userRes.data) setUser(userRes.data);
    }

    checkLoggedIn();
  }, [])

  return (
    <BrowserRouter >
      <UserContext.Provider value={{user, setUser}}>
        <UtilContext.Provider value={{modal, setModal}}>
        <div className="App" >
          {
            modal && 
              {
                Post: <PostModal />,
                Login: <LoginModal />,
                SignUp: <SignUpModal />,
              }[modal]
          }
          <Navbar />
          <Switch>
            <Route exact path='/'  />
            <Route path="/posts/:id" component={Post}/>
            <Route path="/posts" component={Posts}/>
            
          </Switch>
        </div>
        </UtilContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
