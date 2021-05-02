import React, {useState, useContext} from 'react'
import Modal from '../Modal';
import { UserContext } from '../../../context/userContext';
import { UtilContext } from '../../../context/utilContext';
import {withRouter} from 'react-router-dom';
import FormInput from '../../FormInput/FormInput';
import GoogleSignIn from '../../googleSignIn/GoogleSignIn';
import axios from 'axios';

const SignUpModal = ({history}) => {

    const { setUser } = useContext(UserContext);
    const { setModal } = useContext(UtilContext);
    const [missingFields, setMissingFields] = useState(false);
    const [passWordNotMatch, setPasswordNotMatch] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
    });

    const {username, password, passwordCheck, email} = form;

    const updateField = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    const handleSignUp = async (e) => {
        try {
        e.preventDefault();
        if (!username.trim() || !password.trim() || !passwordCheck.trim() || !email.trim()) {
          setMissingFields(true);
        } else setMissingFields(false);


        if (password !== passwordCheck ) {
          setPasswordNotMatch(true);
        } else setPasswordNotMatch(false);

        await axios.post("http://localhost:5000/users/register", form ,{ withCredentials: true });
        await axios.post("http://localhost:5000/users/login", {email, password}, { withCredentials: true });

        const userRes = await axios.get("http://localhost:5000/users/user", { withCredentials: true });
        console.log(userRes);
        if (userRes.data) {
          setUser(userRes.data);  
          setModal('');
          history.push('/posts');
        }
        
      } catch (err) {
          console.log(err);
        }
        
    }




    const Inputs = [
        
        {
          for: "username",
          upperLabel: "Username*",
          name: "username",
          handleChange: updateField,
          type: "text",
          inputType: "input",
        },
        {
          for: "password",
          upperLabel: "Password*",
          bottomLabel: "Password must be atleast six characters long",
          name: "password",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        },
        {
          for: "passwordCheck",
          upperLabel: "Confirm Password*",
          name: "passwordCheck",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        },
        {
          for: "email",
          upperLabel: "Email*",
          bottomLabel: "Please enter a valid email address",
          name: "email",
          handleChange: updateField,
          type: "email",
          inputType: "input",
        }]

    return (
        <Modal 
            title={'Create Your Account'}
            submitText={'Sign Up'}
            handleSubmit={handleSignUp}
            >
            {Inputs.map((input, i) => <FormInput key={i} {...input} />) }
            <GoogleSignIn />
            {
              missingFields && <p>Please fill out all required fields.</p>
            }
            {
              passWordNotMatch && <p>Password does not match the confirmation.</p>
            }
        </Modal>
    )
}

export default withRouter(SignUpModal);
