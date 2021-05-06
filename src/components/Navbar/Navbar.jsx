import React, {useState, useEffect, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {Link} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import logo from '../../images/logo.png';
import closeButton from '../../images/close.png'
import { UserContext } from '../../context/userContext';
import { UtilContext } from '../../context/utilContext';
import axios from 'axios';
import './Navbar.css';



const Navbar = ({history}) => {

    const { user, setUser } = useContext(UserContext);
    const { setModal } = useContext(UtilContext);

    const matches = useMediaQuery('(min-width:1000px)');
    const [displayOverlay, setDisplayOverlay]= useState(false);

    useEffect(() => {
        if (matches) setDisplayOverlay(false);
    },[matches])

    const Logout = async () => {
        await axios.get("http://localhost:5000/users/logout", {withCredentials: true});
        setUser('');
        history.push('/');
    }

    const handleLogin = () => {
        setModal('Login');
    }

    const handleSignUp = () => {
        setModal('SignUp');
    }

    const handlePost = () => {
        setModal('Post');
    }

    const NavBarItems = () => {
        return (
            <>
               {
                    user.username ?   
                    <ul>
                        <li>
                            <p onClick={Logout}>Logout</p>
                        </li>
                        <li>
                            <p onClick={handlePost}>Post</p>
                        </li>
                        <li>
                            <Link to="/posts">Blog</Link>
                        </li>
                    </ul>
                    :
                    <ul>
                        <li>
                            <p onClick={handleLogin}>Login</p>
                        </li>
                        <li>
                            <p onClick={handleSignUp}>Sign up</p>
                        </li>
                        <li>
                            <Link to="/posts">Blog</Link>
                        </li>
                    </ul> 
               }
            </>
        )
    }

    return (
        <>
        {
            matches ? 
            <div className="navbar">
                <Link to="/">
                    <img src={logo} alt="logo"/>
                </Link>
                <NavBarItems />
            </div>
            :
            !displayOverlay &&
            <div className="navbar-small">
                <Link to="/">
                    <img src={logo} alt=""/>
                </Link>

                <i className="fas fa-bars fa-2x" onClick={() => setDisplayOverlay(!displayOverlay)}/>
            </div>    
        }
        {
            displayOverlay && 
            <div className="mobile-overlay">
                <Link to="/">
                    <img className="overlay-logo" src={logo} alt=""/>
                </Link>
                <img className="close" onClick={() => setDisplayOverlay(!displayOverlay)} src={closeButton} alt="close button"/>
                <NavBarItems />
            </div>
        }
        </>
        
    )
}

export default withRouter(Navbar)
