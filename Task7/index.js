const { Worker, parentPort } = require('worker_threads');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const worker = new Worker('./nonce.js')
app.use(bodyParser.json());
app.use(logger('dev'));

var ans = {"nonce" : -1,"result" : "searching"};
app.post('/start',(req,res)=>{
    console.log(req.body.data);
    worker.postMessage(req.body.data);
    res.statusCode=200;
    res.setHeader('Content-Type', 'text/plain');
    res.send("OK");
})
worker.on('message', (msg) => {
        ans["result"] = "found";
        ans["nonce"] = msg;
});
app.get('/result',(req,res)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(ans));
    console.log("Response sent to user : " + JSON.stringify(ans));
    
})

app.listen(8787,()=>{
    console.log("Listening on port 8787");
})
