const express = require('express');
const http = require('http');
const cors = require("cors");
const path = require("path")
const bodyParser = require('body-parser')
require('./db/mongoose')
require('dotenv').config()

const postRouter = require('./routers/postRouter');

const app = express()
const port = "3000"

app.use(cors({credentials: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers",  req.headers['access-control-request-headers']);
    next();
});

app.use(express.json())

app.use(postRouter);

app.use(express.static(path.join(__dirname, 'public')));


const server = http.createServer(app)
server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})