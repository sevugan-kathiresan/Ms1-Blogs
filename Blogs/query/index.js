const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// InMemory DataStructure to hold the posts and comments
const posts = {}

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
    const { type, data } = req.body

    if (type === "postCreated") {
        const { id, title} = data;

        posts[id] = {id, title, comments: []};
    }

    if (type === "commentCreated"){
        const { id, content, postId, status } = data;

        posts[postId].comments.push({ id, content, status });
    }

    //Print out the current state of out In memory posts data structure
    console.log(posts)
    res.send({})

});

app.listen(4002, () => {
    console.log("Listening on 4002");
})

