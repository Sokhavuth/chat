// index.js
// npm install express
// npm install socket.io
// npm install nodemon

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require('path');
const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

const users = {};
io.on('connection', (socket) => {
    socket.emit('connection');

    socket.on('new user', (obj) => {
        users[obj.userid] = obj.username;
        obj.users = users;
        io.emit('new user', obj);
    });

    socket.on('chat message', (obj) => {
        obj.chatName = users[obj.userid];
        io.emit('chat message', obj);
    });

    socket.on('user left', (userid) => {
        const obj = {};
        const username = JSON.stringify(users[userid]);
        obj.username = JSON.parse(username);
        delete users[userid];
        obj.users = {...users};
        io.emit('user left', obj);
        socket.disconnect();
    });
});

server.listen(port, () => {
    console.log(`listening on *${port}`);
});