const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 42000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middleware
app.use(express.json());
var client = {};

io.on("connection", (socket) => {
    app.get("/", (req, res) => {
        res.send(socket.id, "has joined");
    });
    socket.on("sign-in", (id) => {
        console.log(id);
        client[id] = socket;
        console.log(client);
    });
    socket.on("message", (msg) => {
        console.log(msg);
        var targetID = msg.targetID;
        if (client[targetID]) client[targetID].emit("message", msg);
    });
    socket.on("disconnect", () => {
        console.log(socket.id, "has disconnected.");
        for (const [id, clientSocket] of Object.entries(client)) {
            if (clientSocket === socket) {
                delete client[id];
                console.log(client);
                break;
            }
        }
    });
});

server.listen(port, () => {
    console.log("Server is starting");
});