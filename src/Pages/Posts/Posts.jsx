import React, {useEffect, useState, useRef, useCallback} from 'react';
import PostListItem from '../../components/PostListItem/PostListItem';
import axios from 'axios';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './Posts.css'

const Posts = () => {

    const matches = useMediaQuery('(min-width:1000px)');
    const smallMatches = useMediaQuery('(max-width:794px)');

    const [posts, setPosts] = useState([]);
    const [skip, setskip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [count, setCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const observer = useRef();
    const lastPostRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                if ( skip < count) {
                    setskip(prevSkip => prevSkip + 12);
                }
                else setHasMore(false); 
            }
        });
        if (node) observer.current.observe(node)
    });

    useEffect(() => {
        const getPosts = async () => {
            const postRes = await axios.get('http://localhost:5000/posts?limit=12');
            setPosts(postRes.data); 
            const countRes = await axios.get('http://localhost:5000/posts/info/count');
            setCount(countRes.data);
        }
        getPosts();
    },[]);

    useEffect(() => {
        if (skip === 0) return;
        const getPostsPaginated = async (skip,limit) => {
            setIsLoading(true);
            const postRes = await axios.get(`http://localhost:5000/posts/?limit=${limit}&skip=${skip}`);
            if (postRes.data.length > 0) setPosts(prevPosts => [...prevPosts,...postRes.data]);
            setIsLoading(false);
        }
        getPostsPaginated(skip,12)
    },[skip]);

    return (
        <div className={matches ? "posts-page" : smallMatches ? "posts-page-mobile": "posts-page-tablet"}>
            <div className={matches? "post-list" : "post-list-mobile" }>
                {posts.length > 0 && posts.map((post,i) => {
                    if (posts.length === i + 1) 
                        return <PostListItem innerRef={lastPostRef} key={post._id} post={post}/>
                    else return <PostListItem key={post._id} post={post}/>   
                    }
                )}
            </div>
        </div>
    )
}

export default Posts
