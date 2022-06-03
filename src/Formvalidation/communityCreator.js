import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase";

export async function CreateCommunityAvatar(value) {
  const fileName = ref(storage, value.name);
  await uploadBytes(fileName, value);
  var url = await getDownloadURL(fileName);
  return url;
}

export const uploadImage = async (file) => {

  const fileName = ref(storage, file);
  await uploadBytes(fileName, file);
  var url = await getDownloadURL(fileName);
  return url;
};
