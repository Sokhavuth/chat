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
        users[socket.id] = obj.username;
        obj.users = users;
        io.emit('new user', obj);
    });

    socket.on('chat message', (obj) => {
        obj.chatName = users[socket.id];
        io.emit('chat message', obj);
    });

    socket.on('user left', () => {
        deleteUser();
        socket.disconnect();
    });

    socket.on("disconnect", () => {
        if(users[socket.id]){
            deleteUser();
        }
    });

    function deleteUser(){
        const obj = {};
        const username = JSON.stringify(users[socket.id]);
        obj.username = JSON.parse(username);
        delete users[socket.id];
        obj.users = {...users};
        io.emit('user left', obj);
    }
});

server.listen(port, () => {
    console.log(`listening on *${port}`);
});