import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './Post.css'

const Post = ({match}) => {

    const matches = useMediaQuery('(min-width:1000px)');


    const {id} = match.params;

    const [post, setPost] = useState('');

    const renderDate = (dateStr) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateStr);

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }


    useEffect(() => {
        const getPost = async () => {
            const postRes = await axios.get(`http://localhost:5000/posts/${id}`);
            setPost(postRes.data);
        }
        getPost();
    }, [id]);

    console.log(post.date)
    
    

    return (
        <div className={matches ? "post-overlay" : "post-overlay-mobile"}>
            <article className="post-content">
                <h1>{post.title}</h1>
                <p>{renderDate(post.createdAt)}</p>
                <img src={post.postImage} alt="post-header-image"/>
                <p className={matches ? "post-body" : "post-body-mobile"}>{post.body}</p>
            </article>
            
        </div>
    )
}

export default Post
