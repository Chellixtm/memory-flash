const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/memory-flash'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/memory-flash/index.html'));
});

app.listen(process.env.PORT || 5000);