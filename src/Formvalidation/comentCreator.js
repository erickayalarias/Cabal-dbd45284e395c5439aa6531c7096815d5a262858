import { addcomment } from "../features/Posts";


export const initialValuesPostValidation = {
    commentPost:""
}

export async function onSumbitPostComent (values, actions, dispatch, user,postid) {
    const addComments = {
        "uid": user.uid,
        "_id": postid,
        data: {
          "comments": values.commentPost
        }
      }

      dispatch(addcomment(addComments))
      actions.resetForm();
}