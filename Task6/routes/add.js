const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const https = require('https');
var addRouter = express.Router();
const options = new URL('https://localhost:8787/add');
addRouter.use(bodyParser.json());
addRouter.route('/')
map = new Map()
peers = ["http://d0e96ed9.ngrok.io/add"]
addRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Please send POST request');
})
.post((req, res, next) => {
    var body = '';
    req.on('data',chunk => {
        body =body+chunk.toString();
    })
    req.on('end',()=>{
        body = JSON.parse(body);
        var key = body.key;
        var value =body.value;
        if(map.has(key)== false){
            console.log("Request by user : "+JSON.stringify(body))
            peers.forEach(peer => {
                console.log("Request sent to : "+peer);
                axios.post (peer, { "key" : key,"value" : value})
                    .catch((err) => {
                        console.log("Error in sending request to : "+peer);
                        console.log(err);
                    })
            })
            map.set(key,value);
            res.send('Data is logged');
        }
        else {
            res.end('Key already present in data')
        }
        console.log(map)
    })
    
})
.put((req, res, next) => {
    res.end('Please send POST request');
})
.delete((req, res, next) => {
    res.end('Please send POST request');
})

module.exports = addRouter;
