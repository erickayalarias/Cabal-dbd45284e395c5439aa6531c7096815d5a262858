import CryptoJS from "crypto-js";



export function getComunityPassword(password) {
    const PrivateNumber = parseInt(password, 16); //TODO Convert to decimal
    return PrivateNumber;
  }

  export function encryptTextComunity(Text,password) {
    // const privateKey = getComunityPassword(password)
    let privateKey = CryptoJS.SHA256(password).toString();
    const key = CryptoJS.enc.Utf8.parse(privateKey);
    const iv = CryptoJS.enc.Utf8.parse('1583288699248111');
    var encryptedText = CryptoJS.AES.encrypt(Text, key, { iv: iv });
    return encryptedText.toString();
  }

export function decryptTextComunity(Text,password) {
    // const privateKey = getComunityPassword(password)
    let privateKey = CryptoJS.SHA256(password).toString();
    const key = CryptoJS.enc.Utf8.parse(privateKey);
    const iv = CryptoJS.enc.Utf8.parse('1583288699248111');
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(Text),
    }); // TODO Parse the message to ciphertext
    var decryptedFromText = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: iv,
    });
    return decryptedFromText.toString(CryptoJS.enc.Utf8);
  }