import React from 'react'
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import './PostListItem.css';

const PostListItem = ({innerRef,post}) => {

    

    const matches = useMediaQuery('(min-width:1000px)');
    const smallMatches = useMediaQuery('(max-width:795px)');

    

    const renderDate = (dateStr) => {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(dateStr);

        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    return (
        <div ref={innerRef} className={matches ? "post-item" : smallMatches ? "post-item-mobile" : "post-item-tablet"}>
            <div className="post-item-image">
                <Link to={`/posts/${post._id}`}>
                    <img src={post.postImage}/>
                </Link>
                
            </div>
            <p className="post-date">{renderDate(post.createdAt)}</p>
            <Link to={`/posts/${post._id}`} className="post-title">
                {post.title}
            </Link>
            
        </div>
    )
}

export default PostListItem
