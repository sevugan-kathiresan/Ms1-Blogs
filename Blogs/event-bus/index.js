const express = require("express");
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);
    // Since we are not using aync await syntax it is best to catch errors using .catch() statement
    // In case of async await we can use try{}catch{} block syntax
    // Example for the try catch syntax can be found in the index file of moderation service
    axios.post("http://localhost:4000/events", event).catch((err)=>console.log(err))
    axios.post("http://localhost:4001/events", event).catch((err)=>console.log(err))
    axios.post("http://localhost:4002/events", event).catch((err)=>console.log(err))
    axios.post("http://localhost:4003/events", event).catch((err)=>console.log(err))

    res.send({status:'OK'})
});

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, ()=> {
    console.log("Listening on 4005")
})