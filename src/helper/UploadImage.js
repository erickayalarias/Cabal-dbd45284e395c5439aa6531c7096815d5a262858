import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const uploadImage = async (file) => {
    const fileName = ref(storage, file.name);
    await uploadBytes(fileName, file);
    var url = await getDownloadURL(fileName)
    return url;
}
