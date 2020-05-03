const prompt = require('prompt-sync')()
const sha256 = require('sha256');


var string = prompt('Enter the string :');
var i=0;
while(1){
    var result=sha256(string+i);
    var hex= parseInt("0x"+result);
    if(hex<0x0000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF){
        console.log(result);
        console.log(string+i);
        break;
    }
    i++;
}