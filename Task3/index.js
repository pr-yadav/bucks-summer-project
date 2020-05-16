const prompt = require('prompt-sync')()
const sha256 = require('sha256')
const fs = require('fs');
const path = require('path');

class input{
    constructor(id,idx,length_of_sign,sign){
        this.id = id;
        this.idx = idx;
        this.length_of_sign = length_of_sign;
        this.sign = sign;
    }
}


class output{
    constructor(coins,length_of_key,key){
        this.coins=coins;
        this.length_of_key = length_of_key;
        this.key =key ;
    }
}


var Inputs = new Array;
var Outputs = new Array;
var transaction = Buffer.alloc(0)
function IntToBytes (num,bits){
    if(bits==4){
        var buf = Buffer.alloc(4);
        buf.writeInt32BE(num);
    }
    else{
        var buf =Buffer.alloc(8)
        buf.writeBigInt64BE(num)
    }
    return buf
}

function main(){
    var no_of_inputs = prompt('Enter no. of Inputs : ');
    transaction=Buffer.concat([transaction,IntToBytes( no_of_inputs,4)])
    for(var i=0;i<no_of_inputs;i++){
        id = prompt("Enter the transaction ID : ");
        idx = prompt("Enter the index : ");
        signature = prompt("Enter the signature : ")
        transaction=Buffer.concat([transaction,Buffer.from(id,'hex'),IntToBytes(idx,4),IntToBytes(Buffer.byteLength(signature, 'hex')),Buffer.from(signature,'hex')])
        Inputs[i] = new input(id,idx,Buffer.byteLength(signature, 'hex'),signature);
    }
    
    var no_of_outputs = prompt('Enter no. of Outputs : ');
    transaction=Buffer.concat([transaction,IntToBytes( no_of_outputs,4)])

    for(var i=0;i<no_of_outputs;i++){
        var coins = prompt("Enter the number of coins : ");
        var key_file = prompt('Enter the path of file containing public key :');
        var key = fs.readFileSync(path.join(__dirname, key_file), 'utf8');
        transaction=Buffer.concat([transaction,IntToBytes( coins,8),IntToBytes(Buffer.byteLength(key, 'utf8')),Buffer.from(key,"utf8")])
        Outputs[i] = new output(coins,Buffer.byteLength(key, 'utf8'),key);
    }
}


main();
var filename = sha256(transaction) + '.dat'
console.log(filename)
fs.writeFile(filename, transaction_bits, function (err) {
    if (err) return console.log(err);
    console.log("File created with Filename " + filename);
});
