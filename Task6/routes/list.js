const express = require('express');
const bodyParser = require('body-parser')
var listRouter = express.Router();
require('./add');
listRouter.use(bodyParser.json());
listRouter.route('/')
var output = new Object()
listRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
})
.get((req,res,next) => {
    
    console.log(map)
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        output[key] = value;
    }
    console.log(JSON.stringify(output))
    res.end(JSON.stringify(output))
})
.post((req, res, next) => {
    res.end('Please send GET request');
})
.put((req, res, next) => {
    res.end('Please send GET request');
})
.delete((req, res, next) => {
    res.end('Please send GET request');
})

module.exports = listRouter;