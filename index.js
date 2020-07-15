const express = require('express');
const app = express();

let record = [];

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb'}));

app.post('/api', (request, response) => {
    console.log('I have a request ');
    const data = request.body;

    const rec = [data.lat, data.lon];

    response.json({
        status: 'success',
        latitude: request.lat,
        longitude: request.lon,
    });
 
   record.push( rec );
 
    console.log('record', record);
})