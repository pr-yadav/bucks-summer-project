const prompt = require('prompt-sync')()
const fs = require('fs');
const path = require('path');
const sha256 =require('sha256')
class input{
    constructor(id,idx,length_of_sign,sign){
        this.Transaction_ID = id;
        this.Index = idx;
        this.Length_of_the_signature = length_of_sign;
        this.Signature = sign;
    }
}


class output{
    constructor(coins,length_of_key,key){
        this.Number_of_Coins=coins;
        this.Length_of_public_key = length_of_key;
        this.Public_key =key ;
    }
}

var Inputs = new Array;
var Outputs = new Array;
transaction_file = prompt("Enter the name of file containing transaction data : ");
try {
    var transaction = fs.readFileSync(path.join(__dirname, transaction_file));
} catch (err) {
   console.log("File not found using default file");
   var transaction = fs.readFileSync(path.join(__dirname, '010.dat'), 'utf8');
} 

var tmp=0;

function main(){
    var no_of_inputs = transaction.readUInt32BE(0,4)
    tmp=4;
    for(var i=0;i<no_of_inputs;i++){
        id = transaction.toString("hex", 0+tmp, tmp +32)
        idx = transaction.readUInt32BE(tmp+32,tmp+36)
        sign_length = transaction.readUInt32BE(tmp+36,tmp+40)
        signature = transaction.toString("hex", 40+tmp, tmp +40 + sign_length)
        tmp=tmp+40+sign_length
        Inputs[i] = new input(id,idx,sign_length,signature);
    }
    
    var no_of_outputs = transaction.readUInt32BE(tmp,tmp+4)
    tmp=tmp+4;
    for(var i=0;i<no_of_outputs;i++){
        var coins = parseInt(transaction.toString("hex",tmp,tmp+8),16)
        var key_len = transaction.readUInt32BE(tmp+8,tmp+12)
        var key = transaction.toString("utf8", tmp+12, tmp +12 + key_len)
        tmp=tmp+12+key_len
        Outputs[i] = new output(coins,key_len,key);
    }
    console.log('Transaction ID : '+(sha256(transaction)))
    console.log('Number 0f inputs = '+no_of_inputs)
    console.log(Inputs)
    console.log('Number of Outputs = '+no_of_outputs)
    console.log(Outputs)
}

main()
