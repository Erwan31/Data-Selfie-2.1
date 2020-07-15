
// Include express server
const express = require('express');
const app = express();

// Include file system
const fs = require('fs');

// Include NeDB database
const Datastore = require('nedb');


let record = [];

// Create database file
const database = new Datastore('database.db');
database.loadDatabase();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

app.post('/api', (request, response) => {
    console.log('I have a request ');
    const data = request.body;

    // Store data locally
    const datafile = [data.lat, data.lon];
    // Save into a file with timestamp
    const currentDate = new Date();
    const date = currentDate.getDate();
    const stringFile = "";
    
    // Display an answer onto the client
    response.json({
        status: 'success',
        latitude: request.lat,
        longitude: request.lon,
    });
 
    // Keep the position
    record.push( stringFile.concat(Date.now(),",", datafile, "\r\n") ); 
 
   // See the recorded values inside the server console
    console.log('record', record);

    fs.appendFile("/test.txt", record, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    }); 

    const timestamp = Date.now();
    database.insert({datafile, timestamp});
}); 


