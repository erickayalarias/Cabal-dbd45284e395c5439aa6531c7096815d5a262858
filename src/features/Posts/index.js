import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import socket from "../../helper/socket";
import { encryptPost } from "./encrypt";
import {
  createPost,
  getCommentsPost,
  getuserPosts,
  deletePost,
  addComment,
  updatepost,
  likePost,
  checklikePost,
} from "./postAPI";

//thunks

export const deletePostUser = createAsyncThunk(
  "posts/upload",
  async (idPost) => {
    const response = await deletePost(idPost);
    return JSON.parse(JSON.stringify(response));
  }
);

export const uploadPost = createAsyncThunk("posts/upload", async (postData) => {
  let data = await encryptPost(postData);
  const response = await createPost(data);
  socket.emit("post", data);
  return JSON.parse(JSON.stringify(response));
});

export const editPost = createAsyncThunk("posts/edit", async (postData) => {
  postData.data = await encryptPost(postData.data);
  const response = await updatepost(postData);
  return JSON.parse(JSON.stringify(response));
});

export const getPost = createAsyncThunk("posts/get", async (user) => {
  const response = await getuserPosts(user);
  return JSON.parse(JSON.stringify(response));
});

export const addcomment = createAsyncThunk(
  "posts/addcomments",
  async (commentData) => {
    const response = await addComment(commentData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const getcoment = createAsyncThunk(
  "posts/comments",
  async (postData) => {
    const response = await getCommentsPost(postData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const likepost = createAsyncThunk("posts/likepost", async (postData) => {
  const response = await likePost(postData);
  return JSON.parse(JSON.stringify(response));
});

export const checklikepost = createAsyncThunk(
  "posts/checklikepost",
  async (postData) => {
    const response = await checklikePost(postData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState: {
    stateDispach: false,
    post: [],
    postComments: [],
  },
  reducers: {
    setPostComments: (state, action) => {
      state.postComments = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(uploadPost.pending, (state, action) => {
      state.stateDispach = false;
    });
    builder.addCase(uploadPost.fulfilled, (state, action) => {
      state.stateDispach = action.payload.data.success;
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.post = action.payload.data.data.sortedPostList.reverse();
    });
    builder.addCase(getcoment.fulfilled, (state, action) => {
      state.postComments = action.payload.data.data;
    });
  },
});
export const { setPostComments } = postSlice.actions;
export default postSlice.reducer;
