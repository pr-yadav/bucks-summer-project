const sha256 = require('sha256');
const { Worker, parentPort } = require('worker_threads');


var i=0;
var data = "hellp";
parentPort.on('message',msg =>{
    data=msg;
})
while(1){
    var result=sha256(data+i);
    var hex= parseInt("0x"+result);
    if(hex<0x0000000F00000000000000000000000000000000000000000000000000000000){
        parentPort.postMessage(i);
        break;
    }
    i++;
}
