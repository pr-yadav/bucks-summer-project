const prompt = require('prompt-sync')()
const fs = require('fs');
const path = require('path');
const conv = require('binstring');
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
    var transaction = fs.readFileSync(path.join(__dirname, transaction_file), 'utf8');
} catch (err) {
   console.log("File not found using default file");
   var transaction = fs.readFileSync(path.join(__dirname, '259d62d0ce412a5597ca93ae1c9b1e6a59f853a41ae6d514770af5cd08990de8.dat'), 'utf8');
} 


function BinaryToString(str) {
    str = str.match(/.{1,8}/g).join(" ");

    var newBinary = str.split(" ");
    var binaryCode = [];

    for (i = 0; i < newBinary.length; i++) {
        binaryCode.push(String.fromCharCode(parseInt(newBinary[i], 2)));
    }
    
    return binaryCode.join("");
}

var tmp=0;
function main(){
    var no_of_inputs = parseInt(transaction.slice(tmp + 0,tmp + 32),2)
    tmp=32;
    for(var i=0;i<no_of_inputs;i++){
        id = conv((BinaryToString(transaction.slice(0+tmp,256+tmp))),{ in : 'binary', out : 'hex'})
        idx = parseInt(transaction.slice(256+tmp,288+tmp),2)
        sign_length = parseInt(transaction.slice(288+tmp,320+tmp),2)
        signature = BinaryToString(transaction.slice(320+tmp,320+sign_length*8+tmp))
        tmp=tmp+320+sign_length*8
        Inputs[i] = new input(id,idx,sign_length,signature);
    }
    
    var no_of_outputs = parseInt(transaction.slice(tmp,tmp+32),2);
    tmp=tmp+32;
    

    for(var i=0;i<no_of_outputs;i++){
        var coins = parseInt(transaction.slice(tmp,tmp+64),2)
        var key_len = parseInt(transaction.slice(tmp+64,tmp+96),2)
        var key = BinaryToString(transaction.slice(tmp+96,tmp+96+key_len*8))
        tmp=tmp+96+key_len*8
        Outputs[i] = new output(coins,key_len,key);
    }
    console.log('Transaction ID : '+(sha256(transaction)))
    console.log('Number 0f inputs = '+no_of_inputs)
    console.log(Inputs)
    console.log('Number of Outputs = '+no_of_outputs)
    console.log(Outputs)
}

main()
