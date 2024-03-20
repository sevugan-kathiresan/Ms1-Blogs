import React, { useState, useEffect } from "react";
import axios from "axios";

//Component Imports
import CommentCreate from "./CommentCreate";
import CommentsList from "./CommentsList";

const PostsList = () => {
    const [posts, setPosts] = useState({});

    // Function to fetch posts from out backend
    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4000/posts");
        setPosts(res.data);
    };

    useEffect(()=>{
        fetchPosts();
    },[])

    const renderedPosts = Object.values(posts).map(post => {
        return(
            <div className="card" style={{ width: '30%', marginBottom:'20px'}} key={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentsList postId={post.id}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>
        );
    })

    return(
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
}

export default PostsList;