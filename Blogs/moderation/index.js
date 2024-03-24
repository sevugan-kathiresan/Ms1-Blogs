const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// Route to receive events
app.post("/events", async (req, res) => {
    const { type, data } = req.body;
    
    // Decision to approve or reject the comment
    if (type === "commentCreated") {
        // Ternary statement
        const status = data.content.includes("orange") ? "rejected" : "approved";

        // Send back the moderated comment to the event bus
        await axios.post("http://localhost:4005/events", {
            type : "commentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        });

    }

    
});

app.listen(4003, ()=>{
    console.log("Listening on 4003");
})

