const express = require('express');
const http = require('http');

const chatcontroller = require('./controller/userControl')

var parser = require('body-parser')

// create express app
var app = express();
var server = http.createServer(app);
var routes = require('./router/userRouter')

//For front end connectivity
app.use(express.static('../client'));


// parse requests of content-type - application/x-www-form-urlencoded
app.use(parser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(parser.json())

// define a simple route
app.use('/', routes)

server.listen(3000, () => {
    console.log("Server is listening to port 3000");

})

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log("socket is connected successfully");
    socket.on('createMessage', function (message) {
        console.log(" message in socketbserbvice", message);
        io.emit('newMessageSingle', message);

        chatcontroller.addMessage(message, (err, data) => {
            console.log('msg from server', message)
            if (err) {
                console.log("Error in message", err);

            }
            else {
                console.log(message, "in server");
                io.emit('newMessageSingle', message);
            }
        })
        socket.on('disconnect', function () {
            console.log("Socket disconnected");

        });
    });

});

// Configuring the database
const dbConfig = require('./config/databaseconfig');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true }).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});




