const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const logger = require('morgan');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));


var map = new Map()
var output = new Object()
var peers = ["http://localhost:4000/add"]


//add endpoint
app.all('/add',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
app.get('/add',(req,res) => {
    res.end('Please send POST request');
})
app.post('/add',(req, res) => {
        var key = req.body.key;
        var value =req.body.value;
        if(map.has(key) === false){
            console.log("Request by user : "+JSON.stringify({key : key,value:value}))
            peers.forEach(peer => {
                 axios.post (peer, { "key" : key,"value" : value})
                     .then(response => {
                        console.log("Request sent to : "+peer);
                        console.log("Response status by peer : "+response.statusText);
                     })
                     .catch((err) => {
                         console.log("Error in sending request to : "+peer);
                         console.log(err);
                     })
            })
            map.set(key,value);
            res.send('Data is logged');
        }
        else {
            res.send('Key already present in data')
        }
        console.log(map)
})


//list endpoint
app.get('/list',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    console.log(map)
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        output[key] = value;
    }
    console.log(JSON.stringify(output))
    res.end(JSON.stringify(output))
})


app.listen(3000);
console.log("Listening on 3000")
