const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

app.get('/', (req,res) => {
    console.log("Hello")
})

app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);

    const transcriptId = req.body.payload.object.id;

    // Trigger an API call with the transcript ID
    const data = JSON.stringify({
        transcript_id: transcriptId
    });

    console.log("This is data -->",data);

    const options = {
        hostname: 'example.com',  // Replace with your API endpoint
        port: 443,
        path: '/api/endpoint',    // Replace with your API path
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };
    /Users/parthjoshi/Desktop/Fetch.ai/Fetch Corporate Suite/zoom-webhook/index.js
    const apiReq = https.request(options, (apiRes) => {
        let responseData = '';
        apiRes.on('data', (chunk) => {
            responseData += chunk;
        });
        apiRes.on('end', () => {
            console.log('API response:', responseData);
        });
    });

    apiReq.on('error', (error) => {
        console.error('Error with API request:', error);
    });

    apiReq.write(data);
    apiReq.end();

    res.status(200).send('Webhook received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
