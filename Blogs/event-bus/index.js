const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json);

app.post("/events", (req, res) => {
    
    const event = req.body;

    // Forward those events to all the services in our application including the one that emitted that event
    axios.post("http://localhost:4000/events", event); // Post
    axios.post("http://localhost:4001/events", event); // Comments
    axios.post("http://localhost:4002/events", event); // Query Service

    res.send({ status: 'OK'});
});

app.listen(4005, ()=>{
    console.log('Listening on 4005');
});

