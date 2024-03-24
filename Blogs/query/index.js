const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// InMemory DataStructure to hold the posts and comments
const posts = {}

const handleEvent = (type, data) => {
    if (type === "postCreated") {
        const { id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    if (type === "commentCreated"){
        const { id, content, postId, status } = data;

        posts[postId].comments.push({ id, content, status });
    }

    if (type === "commentUpdated"){
        console.log(data)
        const {id, postId, status, content} = data;

        // Find the appropriate post
        const post = posts[postId];
        // Find the appropriate comment
        const comment = post.comments.find(comment => {
            return comment.id === id
        });

        comment.status = status;
        comment.content = content;
    }
}

// The data structure will look like this
// posts === {
//     "j123k42" : {
//         id : "j123k42",
//         title: "post title",
//         comments: [
//             { id: "k1234", content: "comments"},
//             { id: "j1234", content: "comments"}
//         ]
//     },
//     "j123k42" : {
//         id : "j123k42",
//         title: "post title",
//         comments: [
//             { id: "k1234", content: "comments"},
//             { id: "j1234", content: "comments"}
//         ]
//     }
// }

// Route to send all the post and comments related information to the client
app.get("/posts", (req, res) => {
    
    res.send(posts);
});

// Route to receive the events emitted from the event bus
app.post("/events", (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({})

});

app.listen(4002, async () => {
    console.log("Listening on 4002");

    const res = await axios.get("http://localhost:4005/events");

    for (let event of res.data){
        console.log("Processing event:", event.type);
        handleEvent(event.type, event.data);
    }

});

