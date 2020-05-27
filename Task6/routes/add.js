const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const https = require('https');
var addRouter = express.Router();
const options = new URL('https://localhost:8787/add');
addRouter.use(bodyParser.json());
addRouter.route('/')
map = new Map()
peers = ["106.207.176.14:8787/add","106.207.176.14:567/add","106.207.176.14:876/add"]
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
        if(map.has(body.key)== false){
            map.set(body.key,body.value)
            res.end('Data is logged');
            body = JSON.stringify(body);
            console.log("Request by user : "+body)
            body = JSON.parse(body);
            peers.forEach(peer => {
                console.log(body.key)
                
                axios.post(peer,{
                    key : body.key,
                    value : body.value
                }).then( (res) =>{
                    console.log("HI1")
                    console.log("Request sent to : "+peer)
                    console.log("Peer Response Status" + (res.statusCode)+"Peer response Body"+res.data);
                }).catch((err)=>{
                    console.log("Error sending data to : "+peer);
                    console.log("Error : ")
                })
            });
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