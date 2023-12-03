//create web server
const express = require('express');
const app = express();
const port = 3000;
//create database
const Datastore = require('nedb');
const db = new Datastore('comments.db');
db.loadDatabase();
//allow express to use static files
app.use(express.static('public'));
//allow express to use json
app.use(express.json({limit: '1mb'}));
//get request
app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if(err) {
            response.end();
            return;
        }
        response.json(data);
    });
});
//post request
app.post('/api', (request, response) => {
    console.log('I got a request!');
    console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data);
    response.json(data);
});
//listen for requests
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
});