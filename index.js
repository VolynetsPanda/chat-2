const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 80;
app.use(express.static(__dirname+'/public'));
server.listen(port);

io.on("connection", function (socket) {
    let id = socket.id;
    let name = id.toString().substr(1,4);
    socket.emit("myNameId", id);
    socket.on("newMsg", function (text) {
        //io.sockets.emit("msg", text);
        socket.broadcast.emit("allUsers", id, text);
        socket.emit("iLoveMe", text);
    })
    socket.on("privat", function (id, text) {
        socket.broadcast.to(id).emit("privats", id, text);
        console.log(id, text);
    });
})