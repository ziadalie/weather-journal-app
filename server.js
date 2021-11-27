// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port, callback=>{
    console.log(`running on localhost: ${port}`);
});

// Setting up a GET route to return the projectData object
app.get('/getData', (req, res)=>{
    res.send(projectData);
});

// Setting up a POST route to add incoming data to the projectData object
app.post('/addData', (req, res)=>{
    projectData = {...req.body};
    res.send();
});