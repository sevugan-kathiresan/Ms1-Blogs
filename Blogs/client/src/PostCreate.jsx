import React, { useState } from "react";
import axios from 'axios';

const PostCreate = ()=>{
    const [title, setTitle] = useState('');

    // Function to handle submit
    const onSubmit = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:4000/post', {
            title
        });
        // Clearing out the input field once the user submitted
        setTitle("");
    };

    return(
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <br/>
                    <input value={ title } onChange={ e => setTitle(e.target.value)} className="form-control"/>
                </div>
                <br/>
                <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default PostCreate