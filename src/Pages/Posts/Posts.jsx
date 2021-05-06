import React, {useEffect, useState, useRef} from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './Posts.css'

const Posts = () => {

    const [posts, setPosts] = useState([]);
    const matches = useMediaQuery('(min-width:1000px)');
    const smallMatches = useMediaQuery('(max-width:794px)');

    const scrollRef = useRef(null);

    const handleScroll = (e) => {
        console.log(e.currentTarget.scrollTop);
        console.log(e.currentTarget.scrollHeight);
        console.log(e.currentTarget.clientHeight)
    }


    useEffect(() => {

        const getPosts = async () => {
            const postRes = await axios.get(`http://localhost:5000/posts?limit=6skip=0`);
            setPosts(postRes.data); 
        }

        getPosts();

    },[]);

    

    return (
        <div
            onScroll={handleScroll}
            ref={scrollRef}
            className={matches ? "post-list" : smallMatches ? "post-list-mobile": "post-list-tablet"}>
            {posts.length > 0 && posts.map(post => 
                <PostListItem key={post._id} post={post}/>)}
        </div>
    )
}

export default Posts
