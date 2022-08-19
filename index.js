// index.js
// npm install express
// npm install socket.io
// npm install nodemon

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');


const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
  console.log(`listening on *${port}`);
});