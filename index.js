// index.js
// npm install express
// npm install socket.io
// npm install nodemon

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);


const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h4>Welcome to Khmer Web Chat App!</h4>');
});

server.listen(port, () => {
  console.log(`listening on *${port}`);
});