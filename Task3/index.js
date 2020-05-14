const prompt = require('prompt-sync')()
const sha256 = require('sha256')
const fs = require('fs');
const path = require('path');
const conv = require('binstring');


var transaction_bits = new String;


function IntToBinary (number,bits){
    binary = new String ; 
    parseInt(number)
    var i=bits-1;
    while(number>0){
        binary = (number)%2+binary;
        number=number/2;
        number= parseInt(number)
        i--;
    }
    
    for(i=i;i>=0;i--){
        binary = 0 + binary;
    }
    return binary;
    
}


function StringToBinary(str, spaceSeparatedOctets) {
    function zeroPad(num) {
        return "00000000".slice(String(num).length) + num;
    }

    return str.replace(/[\s\S]/g, function(str) {
        str = zeroPad(str.charCodeAt().toString(2));
        return !1 == spaceSeparatedOctets ? str : str 
    });
};


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


function main(){
    var no_of_inputs = prompt('Enter no. of Inputs : ');
    transaction_bits = transaction_bits + IntToBinary(no_of_inputs,32);
    
    
    for(var i=0;i<no_of_inputs;i++){
        id = prompt("Enter the transaction ID : ");
        transaction_bits=transaction_bits+StringToBinary(conv(id, { in:'hex', out:'binary' }))
        idx = prompt("Enter the index : ");
        transaction_bits=transaction_bits+IntToBinary(idx,32)
        signature = prompt("Enter the signature : ")
        transaction_bits=transaction_bits+ IntToBinary(Buffer.byteLength(signature, 'utf8'),32)+StringToBinary(signature);
        Inputs[i] = new input(id,idx,Buffer.byteLength(signature, 'utf8'),signature);
    }
    
    var no_of_outputs = prompt('Enter no. of Outputs : ');
    transaction_bits = transaction_bits + IntToBinary(no_of_outputs,32);


    for(var i=0;i<no_of_outputs;i++){
        var coins = prompt("Enter the number of coins : ");
        transaction_bits=transaction_bits+IntToBinary(coins,64)
        var key_file = prompt('Enter the path of file containing public key :');
        var key = fs.readFileSync(path.join(__dirname, key_file), 'utf8');
        transaction_bits=transaction_bits+ IntToBinary(Buffer.byteLength(key, 'utf8'),32)+StringToBinary(key);
        Outputs[i] = new output(coins,Buffer.byteLength(key, 'utf8'),key);
    }
}


main();
console.log("Your Input")
console.log(Inputs)
console.log('Your Output')
console.log(Outputs)
var filename = sha256(transaction_bits) + '.dat'
fs.writeFile(filename, transaction_bits, function (err) {
    if (err) return console.log(err);
    console.log("File created with Filename " + filename);
});
