const prompt = require('prompt-sync')()
const crypto = require('crypto')
var fs = require('fs');
const path = require('path');

var text = prompt('Enter the text :');
var key_file = prompt('Enter the name of file containing public key :');
var signature = prompt('Enter the Signature :');

var publicKey = fs.readFileSync(path.join(__dirname, key_file), 'utf8');

const verify = crypto.createVerify('RSA-SHA256')
verify.update(Buffer.from(text, 'utf8'))
verifyRes = verify.verify({key:publicKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}, Buffer.from(signature, 'hex'))

if(verifyRes)console.log("It's correct :)");

else console.log("You are busted!! FBI is on it's way");