import React, {useEffect, useState, useContext} from 'react';
import {withRouter} from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { UtilContext } from '../../../context/utilContext';
import axios from 'axios';
import Modal from '../Modal';
import FormInput from '../../FormInput/FormInput';
import GoogleSignIn from '../../googleSignIn/GoogleSignIn';


const LoginModal = ({history}) => {

    const { setUser } = useContext(UserContext);
    const { setModal} = useContext(UtilContext);

    const [failedLogin, setFailedLogin] = useState(false);
    const [missingFields, setMissingFields] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        
    });

    const {email, password} = form;

    const [subtitle, setSubtitle] = useState("* Indicates Required Fields");

    const updateField = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    

    const handleLogin = async () => {

        setFailedLogin(false);
        setMissingFields(false);

        if (!email.trim() || !password.trim()) {
            setMissingFields(true);
            return;
        }
        try {
            const loginRes = await axios.post("http://localhost:5000/users/login", form, {withCredentials: true});

            if (loginRes.data) {
                const userRes = await axios.get("http://localhost:5000/users/user", {withCredentials: true});
                if (userRes.data) setUser(userRes.data);  
                setModal('');
                history.push('/posts');
            } 

        }

        catch (err) {
            setFailedLogin(true);
        }
        

    }

    useEffect(() => {
        
        if (missingFields) setSubtitle("Please fill out all required fields.");
        if (failedLogin) setSubtitle("Incorrect email or password.");

      }, [failedLogin, missingFields]);
    

    const Inputs = [
        {
          for: "email",
          upperLabel: "Email*",
          name: "email",
          handleChange: updateField,
          type: "text",
          inputType: "input",
        },
        {
          for: "password",
          upperLabel: "Password*",
          name: "password",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        }]

    return (
        <Modal
            title={'Login to Your Account'}
            submitText={'Submit'}
            handleSubmit={handleLogin}
            subtitle={subtitle}
        >
            {Inputs.map((input, i) => <FormInput key={i} {...input}/>
            )}
            <GoogleSignIn />
        </Modal>
    )
}

export default withRouter(LoginModal);
