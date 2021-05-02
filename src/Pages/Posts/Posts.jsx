import React, {useEffect, useState} from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './Posts.css'

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const matches = useMediaQuery('(min-width:1000px)');
    const smallMatches = useMediaQuery('(max-width:794px)');

    useEffect(() => {

        const getPosts = async () => {
            const postRes = await axios.get('http://localhost:5000/posts/');
            setPosts(postRes.data); 
        }

        getPosts();

    },[])

    return (
        <>
            <div className={matches ? "post-list" : smallMatches ? "post-list-mobile": "post-list-tablet"}>
                {posts.length >0 && posts.map(post => 
                    <PostListItem key={post._id} post={post}/>)}
            </div>

        </>
        
    )
}

export default Posts
