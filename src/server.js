const path = require('path');
const http = require('http');
const express  = require('express');
const socketio = require('socket.io');
const database = require('mysql');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3072;
const json = require('./data.json')

// create express server
const app = express();

// create httpserver
const server = http.createServer(app);
// create and connect socket.io server
const io = socketio(server);
io.on('connection',()=>{
   console.log('websocket connected')
});
 app.get('/data.json',(req,res)=>{
    res.send(json);
 })
// connecting view engine 
const publicDirectoryPath = path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));

// app.set("view engine","ejs");
// app.get('/index',(req,res)=>{
// res.render("index");
// })
//listen port


server.listen(port,"172.17.24.208",()=>{
    console.log(`server is up on port ${port} `)
})