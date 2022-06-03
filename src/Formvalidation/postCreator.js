import { getDownloadURL, uploadBytes, ref} from "firebase/storage";
import { storage } from "../firebase/firebase";
import { uploadPost } from "../features/Posts";

export const initialStateCreatePost = {
    TextPost: '',
    Iimage: '',
  }

export async function  onSumbitCreatePost (values, actions, dispatch, user) {
    if(values.Iimage){
        const fileName= ref(storage, values.Iimage.name);
        await uploadBytes(fileName, values.Iimage)
        var url = await getDownloadURL(fileName)
        var fileType = values.Iimage.type.split("/")[0].toUpperCase();
      }
      else{
        var url = null;
        var fileType = "Text";
      }
      const post ={
        "uid": user.uid,
        "publicKey": user.publicKey,
        "author": user.user,
        "type": fileType,
        "title": "",
        "description": values.TextPost,
        "file": url
    }
    dispatch(uploadPost(post))
    actions.resetForm();
}
