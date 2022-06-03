import CryptoJS from 'crypto-js';

//TODO Chat encryption

//TODO Global definition of the encryption values
const n = 10;
const g = 2;

//TODO Each user have a private key

export function getPrivateNumber(privateKey) {
  const keySplit = privateKey.split('');
  const PrivateNumbers = keySplit[0];
  const PrivateNumber = parseInt(PrivateNumbers, 16); //TODO Convert to decimal
  return PrivateNumber;
}

//TODO Get the public param of the user

export function getGandP(privateKey) {
  const PrivateNumber = getPrivateNumber(privateKey);
  const GandP = Math.floor(Math.pow(g, PrivateNumber)); //TODO g^PrivateNumber
  return GandP;
}

//TODO Get the key of the chatroom

export function getKey(GandP, privateKey) {
  const privateNumber = getPrivateNumber(privateKey);
  const key = Math.floor(Math.pow(GandP, privateNumber) % n); //TODO GandP^PrivateNumber mod n
  return key;
}

//TODO Encrypt the chatroom whit the key

export function encryptChat(privateKey, message) {
  const key = getKey(getGandP(privateKey), privateKey);
  const iv = CryptoJS.enc.Utf8.parse('1583288699248111');
  var encryptedCP = CryptoJS.AES.encrypt(message, key, { iv: iv });
  return encryptedCP.toString();
}

//TODO Decrypt the chatroom whit the key

export function decryptChat(privateKey, message) {
  const key = getKey(getGandP(privateKey), privateKey);
  const iv = CryptoJS.enc.Utf8.parse('1583288699248111');
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(message),
  }); //TODO Parse the message to ciphertext
  var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
  });
  return decryptedFromText.toString(CryptoJS.enc.Utf8);
}
