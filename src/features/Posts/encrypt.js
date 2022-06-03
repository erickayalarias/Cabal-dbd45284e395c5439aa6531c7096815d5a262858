import CryptoJS from 'crypto-js';

//TODO CONTENT ENCRYPTION (COMMUNITIES, NEWS)

//TODO Global encryption function

export function encryptText(Text) {
  const privateKey = localStorage.getItem('cabal_privateKey');
  const key = CryptoJS.enc.Utf8.parse(privateKey);
  const iv = CryptoJS.enc.Utf8.parse('1583288699248111');
  var encryptedText = CryptoJS.AES.encrypt(Text, key, { iv: iv });
  return encryptedText.toString();
}

//TODO Global decrypt the text

export function decryptText(Text, privateKey) {
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

//TODO Post Description Encryption

export function encryptPost(TextPost) {
  TextPost.description = encryptText(TextPost.description);
  return TextPost;
}

//TODO Posts Description Descrypt

export function decryptPost(Posts, user) {
  const privateKey = localStorage.getItem('cabal_privateKey');
  return Posts.map((post) => {
    var decryptedFromText;
    if (post.author.publicKey === user.publicKey) {
      //TODO If the user is the author
      decryptedFromText = decryptText(post.description, privateKey);
    } else {
      //TODO If the user is not the author
      user.friends.map((friend) => {
        //TODO Check if the user is a friend
        if (post.author._id === friend.user) {
          //TODO If the friend is the author
          decryptedFromText = decryptText(
            post.description,
            friend.password
          );
        }
      });
    }
    return {
      ...post,
      description: decryptedFromText,
    };
  });
}
