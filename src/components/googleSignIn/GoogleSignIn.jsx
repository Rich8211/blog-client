import React from 'react'
import googleLogo from '../../images/googleLogo.jpg';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './GoogleSignIn.css'


const GoogleSignIn = () => {


    const smallMatches = useMediaQuery('(max-width:720px)');
    const googleLogin = () => {
        window.open('http://localhost:5000/users/auth/google', "self");
    }
    return (
        <div className="googleContainer" onClick={googleLogin}>
            <img src={googleLogo}/>
            <span className={smallMatches ? "mobile" : ""}>Sign In with Google</span>
        </div>
    )
}

export default GoogleSignIn
