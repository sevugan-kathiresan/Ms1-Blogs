// imports
const express = require("express")
const bodyParser = require("body-parser")
const { randomBytes } = require("crypto")

// configuration and instantiation
const app = express()
app.use(bodyParser.json())

// In memory datastructure to hold comments
commentsByPostId = {}

// Routes

// Route to get all the comments associate with a post
app.get("/post/:id/comments", (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

// Route to post a comment for a particular post
app.post("/post/:id/comment", (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // id for comment
    const { content } = req.body; // Extract the content of the  body

    // check if any comments already exists for that post
    const comments = commentsByPostId[req.params.id] || []; // if undefined give me an empty array && req.params.id - lets us extract the URL params
    comments.push({ id: commentId, content}) // Appending the data to the extracted array
    commentsByPostId[req.params.id] = comments // Assigning back to our in memory data structure

    res.status(201).send(comments)
})

app.listen(4001, ()=> {
    console.log("Listening on 4001")
})