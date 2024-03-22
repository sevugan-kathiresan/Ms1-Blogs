const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Route to send all the post and comments related information to the client
app.get("/events", (req, res) => {

});

// Route to receive the events emitted from the event bus
app.post("/events", (req, res) => {

});

app.listen(4002, () => {
    console.log("Listening on 4002");
})

