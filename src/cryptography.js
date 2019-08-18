import crypto from 'crypto';
const algorithm = 'aes-256-cbc';

const PreSharedSecret=Buffer.from('@dfdfddsljfdl44098vkvkhot!@#$$%#');
const IV = Buffer.from('3907fbc9a33f26d1');



function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, PreSharedSecret, IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, PreSharedSecret, IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function encryptObject(obj){
    let tempString=JSON.stringify(obj);
    return encrypt(tempString);
}

function decryptObject(string){
    let tempString=decrypt(string);
    return JSON.parse(tempString)
}

export {decryptObject,encryptObject}
