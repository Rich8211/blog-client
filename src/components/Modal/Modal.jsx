import React, {useContext} from 'react';
import {UtilContext} from '../../context/utilContext';
import closeButton from '../../images/close.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import "./Modal.css";

const Modal = ({ children, handleSubmit, submitText, title, subtitle }) => {

    const {setModal} = useContext(UtilContext);

    const matches = useMediaQuery('(min-width:1100px)');
    const smallMatches = useMediaQuery('(max-width:720px)');

    const handleClose = () => setModal('');

    const handleClick = (e) => {
        if (e.target.className === "overlay") handleClose();
      };
    

    return (
        <div className="overlay" onClick={handleClick}>
            <div className={matches ? "modal" : smallMatches ? "modal-mobile" : "modal-tablet"}>
                <h2 className={smallMatches ? "mobile-title" : 'title'}>{title}</h2>
                <p className={smallMatches? "modal-subtitle-mobile" : "modal-subtitle"}>{subtitle}</p>
                <button onClick={handleClose} className="close">
                    <img src={closeButton} alt="close-button"/>
                </button>
                <div className="form">
                    {children}
                </div>       
                <button onClick={handleSubmit} className="submit">
                    <h3>{submitText}</h3>
                </button>
                
            </div>
        </div>
        
    )
}

export default Modal
