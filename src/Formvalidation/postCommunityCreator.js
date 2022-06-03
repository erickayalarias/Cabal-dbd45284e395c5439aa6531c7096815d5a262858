import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { createpostcommunity } from "../features/communities";
import { storage } from "../firebase/firebase";
import { useId } from "react";
import { encryptTextComunity } from "../helper/functions/encryptComunity";
export const initialStateCreatePost = {
  TextPost: "",
  Iimage: "",
};

export async function onSumbitCreatePostCommunity(
  id,
  values,
  actions,
  dispatch,
  user,
  community
) {
  if (values.Iimage) {
    const fileName = ref(storage, values.Iimage.name);
    await uploadBytes(fileName, values.Iimage);
    var url = await getDownloadURL(fileName);
    var fileType = values.Iimage.type.split("/")[0].toUpperCase();
  } else {
    var url = null;
    var fileType = "Text";
  }
  const post = {
    uid: user.uid,
    publicKey: user.publicKey,
    author: user.user,
    type: fileType,
    title: "",
    description: encryptTextComunity(values.TextPost,community[0].password),
    file: url,
  };

  post.id = id;
  dispatch(createpostcommunity(post));
  actions.resetForm();
}
