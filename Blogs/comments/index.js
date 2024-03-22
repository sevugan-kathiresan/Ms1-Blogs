// imports
const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")
const cors = require("cors");
const axios = require("axios")

// configuration and instantiation
const app = express();
app.use(bodyParser.json());
app.use(cors());

// In memory datastructure to hold comments
commentsByPostId = {}

// Routes

// Route to get all the comments associate with a post
app.get("/post/:id/comments", async (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
});

// Route to post a comment for a particular post
app.post("/post/:id/comment", async (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // id for comment
    const { content } = req.body; // Extract the content of the  body

    // check if any comments already exists for that post
    const comments = commentsByPostId[req.params.id] || []; // if undefined give me an empty array && req.params.id - lets us extract the URL params
    comments.push({ id: commentId, content}) // Appending the data to the extracted array
    commentsByPostId[req.params.id] = comments // Assigning back to our in memory data structure

    // emit the event
    await axios.post("http://localhost:4005/events", {
        type: commentCreated,
        data : {
            id : commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);
});

// Route to listen for broadcast from the event bus
app.post("/events", (req, res) => {
    console.log("Received Event", req.body.type);
    res.send({});
});

app.listen(4001, ()=> {
    console.log("Listening on 4001")
});