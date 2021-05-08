import React, {useState, useContext, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';
import { UtilContext } from '../../../context/utilContext';
import Modal from '../Modal';
import axios from 'axios';
import FormInput from '../../FormInput/FormInput';

const PostModal = ({history}) => {

    const { user } = useContext(UserContext);
    const { setModal } = useContext(UtilContext);

    const [missingFields, setMissingFields] = useState(false);
    const [subtitle,setSubtitle] = useState("* Indicates Required Fields");

    const [form, setForm] = useState({
        postImage: "",
        title: "",
        categories: [],
        body: "",
      });

    const {
        postImage,
        title,
        categories,
        body
    } = form;

    const updateField = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
    }

    const updateImage = (e) => {
    setForm({
        ...form,
        postImage: e.target.files[0],
    });
    }

    const updateCategories = (e) => {
        setForm({
            ...form,
            categories:[...e.target.value.split("\\s*,\\s*")]
        });
    }    

    const handlePost = async (e) => {   

        e.preventDefault();
        if (!user.username) return;

        setMissingFields(false);

        if (!postImage || !title.trim() || !body.trim())  setMissingFields(true);

        try {
            let formData = new FormData();
            formData.append("postImage", postImage);
            formData.append("title", title);
            formData.append("tags", categories);
            formData.append("body", body);
            formData.append("author", user.username);
            await axios.post("http://localhost:5000/posts/", formData, { withCredentials: true });
            setModal('');
            history.push('/posts');
            window.location.reload();
        }
        catch (err) {
            console.log(err)
        }

    } 

    useEffect(() => {
        if (missingFields) setSubtitle("Please fill out all required fields.");
    },[missingFields]);

    const Inputs = [
    {
        for: "HeaderImage",
        upperLabel: "Header Image*",
        bottomLabel: postImage ? `${postImage.name}` : '',
        name: "HeaderImage",
        handleChange: updateImage,
        type: "file",
        inputType: "file",
    },
    {
        for: "title",
        upperLabel: "Title*",
        name: "title",
        handleChange: updateField,
        type: "text",
        inputType: "input",
    },
    {
        for: "categories",
        upperLabel: "Categories",
        name: "categories",
        handleChange: updateCategories,
        type: "text",
        inputType: "input",
    },
    {
        for: "body",
        upperLabel: "Post*",
        name: "body",
        handleChange: updateField,
        type: "text",
        inputType: "textArea",
    },
    ]

    return (
        <Modal
            title={"What Would You Like to Share?"}
            submitText={"Submit"}
            handleSubmit={handlePost}
            subtitle={subtitle}
        >
            {Inputs.map((input, i) => <FormInput key={i} {...input} />) }

        </Modal>
    )
}

export default withRouter(PostModal)
