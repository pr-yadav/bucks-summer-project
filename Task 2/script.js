const prompt = require('prompt-sync')()
const crypto = require('crypto')
var fs = require('fs');
const path = require('path');

var text = prompt('Enter the text :');
var privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8');


const sign = crypto.createSign('RSA-SHA256');
sign.update(Buffer.from(text, 'utf8'));
signature = sign.sign({key:privateKey, padding:crypto.constants.RSA_PKCS1_PSS_PADDING}).toString('hex');
console.log('Signature : '+signature);
