const now = require('nano-time');
const sha256 = require('sha256');
const fs = require('fs');
const prompt = require('prompt-sync')()


function IntToBytes (num,bits){
    if(bits==4){
        var buf = Buffer.alloc(4);
        buf.writeInt32BE(num);
    }
    else{
        var buf =Buffer.alloc(8)
        num = BigInt(num)
        buf.writeBigInt64BE(num)
    }
    return buf
}


var idx = prompt("Enter the index : ");
var ParentBlock = prompt("Enter the hash of Parent Block : ");
var filename = prompt("Enter the name of file : ");
var BlockHash =sha256(fs.readFileSync(filename));
var target = prompt("Enter the target : ");
var StartTime = now();

var i=0;
var time =now();
var result=Buffer.alloc(0);
result = (Buffer.concat([IntToBytes(idx,4),Buffer.from(ParentBlock,"hex"),Buffer.from(BlockHash,"hex"),Buffer.from(target,"hex")]));
var result1=Buffer.alloc(0)
//console.log(result)
while(1){
    time=now();
    result1 = sha256(new Buffer.concat([result,IntToBytes(time,8),IntToBytes(i,8)]));
    //var hex= parseInt("0x"+result1);
    if(result1<target){
        console.log("Hash : "+result1);
        break;
    }
    i++;
    //console.log(time)
    console.log(i)
}

console.log("Nonce : "+i);
console.log("Time Stamp : "+time)

//

console.log("Time Taken : " + (time - StartTime)/1000000000);