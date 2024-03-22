// Imports
const express = require("express");
const bodyParser = require('body-parser'); // helps with parsing the request and response
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require("axios");

// Creating an app instance
const app = express();
app.use(bodyParser.json());
app.use(cors());

// we are not using database for this app so we are creating a JSON object that can hold the posts
const posts = {};

// Creating our routes

// Route to get all the posts
app.get('/posts', (req, res) => {
    res.send(posts);
});

// Route to post a new post
app.post('/post', async (req, res) => {
    // Generate a random id for the post
    const id = randomBytes(4).toString('hex'); // 4 - given as argument to create 4 random bytes
    // retrieve the information from the body
    const { title } = req.body;
    // Store the data in our post object as we don't have DB
    posts[id] = {
        id, title
    }
    // Emit the event
    await axios.post("http://localhost:4005/events", {
        type : "postCreated",
        data : {
            id, title
        }
    })
    // Sending the response
    res.status(201).send(posts[id]) // 201 - new resource created
});

app.listen(4000, () => {
    console.log("Listening on 4000")
});


