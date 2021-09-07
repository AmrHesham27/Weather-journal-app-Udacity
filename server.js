// Create empty JS object to be the endpoint for all routes
let projectData = {};

// require and use all dependents 
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Require body-parser 
const bodyParser = require('body-parser');

// Use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Creating Post Route so that app can send data to the server 
// function to post data using post Route
const addData = async (req, res) => {
  // Put the data in an object 
  try {
  projectData = {
    date : req.body.date ,
    temp : req.body.temp ,
    content : req.body.content ,
    city : req.body.city };
  }
  catch(error){console.log(error)}
};
// Post Route 
app.post('/add', addData);


// Creating get Route so that app can recieve data from the server 
// function to get data using get Route
const getData = async (req, res) => {
  try {
  await res.send(projectData);
  }
  catch(error){console.log(error)};
  // Delete this data after sending it to the app
  projectData = {};
};
// Get Route 
app.get('/all', getData);


// Setup the Server
const port = 8080;
const server = app.listen(port, listening);
function listening() {
  console.log(`your server is running on http://localhost:${port}`);
};