// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// import sha256 from 'crypto-js/sha256';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
require('dotenv').config();
const ethers = require('ethers');
const AES = require("crypto-js/aes");
const CryptoJS = require("crypto-js");
const posABI = require('./constants/posABI');


const provider = new ethers.providers.JsonRpcProvider(
    process.env.NETWORK_RPC,
    parseInt(process.env.NETWORK_CHAINID)
);

const ownerWallet = new ethers.Wallet(process.env.ROYALTY_PK, provider);

var key1 = CryptoJS.enc.Utf8.parse("SecretPassphrase")
var plaintText = 'jmirandacastro@gmail.com';
//encrypt
var encryptedData = AES.encrypt(plaintText, key1, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
});
console.log("plaintText：" + plaintText);
console.log("encryptedData ：" + encryptedData);

var encryptedDataHexStr = encryptedData.toString(CryptoJS.format.Hex);
console.log("encryptedDataHex：" + encryptedDataHexStr );
//-------------------------------------------------------------------------
//decrypt
var encryptedHex = CryptoJS.enc.Hex.parse(encryptedDataHexStr);
var encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
console.log("encryptedHex  ：" + encryptedHex);
console.log("encryptedBase64  ：" + encryptedBase64 );

var decryptedData = AES.decrypt(encryptedBase64, key1, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
});

let decryptText = decryptedData.toString(CryptoJS.enc.Utf8);
console.log("decryptText ：" + decryptText );



// var bytes  = AES.decrypt(encrypted.toString(CryptoJS.format.Hex), "Secret Passphrase", {format: CryptoJS.format.Hex });

console.log();


const pass = CryptoJS.lib.WordArray.random(16);
// salt = CryptoJS.lib.WordArray.random(16);
// key = CryptoJS.PBKDF2(pass.toString(), salt, { keySize: 256/8, iterations: 100000, hasher: CryptoJS.algo.SHA512});
console.log(pass.toString());

const encryptToHex = (text, key) => {
    let encrypted = AES.encrypt(text, key , {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString(CryptoJS.format.Hex);
}

const decryptFromHex = (hex, key) => {
    let encryptedRestored = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hex));
    let decrypted = AES.decrypt(encryptedRestored, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

const getSupply = (pid, amount, mail, number) => {
    const contractAddress =  process.env.POS_ADDRESS;
    // console.log(contractAddress);
    let abi = posABI;
    let sc = new ethers.Contract(contractAddress, abi, ownerWallet);
    let mailENC = encryptToHex(mail, pass);
    let numberENC = encryptToHex(number, pass);
    console.log(mailENC, numberENC)
    console.log(decryptFromHex(mailENC, pass), decryptFromHex(numberENC, pass));

    let sendTransactionPromise = sc.buy(pid, amount, mailENC, numberENC, {
        gasPrice: 10000000000,
        nonce: 180
    });
    sendTransactionPromise.then(function(tx) {
        console.log(tx);
    });
    // const confirmedTnx = await tx.wait();
    // console.log('tx conf ', confirmedTnx);

}

getSupply("6162", "1000000000000000000", "aether@polispay.org", "524493019556");

