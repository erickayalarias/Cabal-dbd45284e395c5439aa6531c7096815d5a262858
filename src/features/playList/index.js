import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getPlayLists,
  postPlayLists,
  updatePlayLists,
  deletePlayLists,
  deleteMusicOnPLaylist,
  postChangePlayListLiked,
} from "./playListApi";

export const getPlayList = createAsyncThunk(
  "playList/get",
  async (publicKey) => {
    const response = await getPlayLists(publicKey);
    return JSON.parse(JSON.stringify(response));
  }
);

export const postPlayList = createAsyncThunk(
  "playList/post",
  async (bodyParameters) => {
    const response = await postPlayLists(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const updatePlayList = createAsyncThunk(
  "playList/update",
  async (bodyParameters) => {
    const response = await updatePlayLists(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const deletePlayList = createAsyncThunk(
  "playList/delete",
  async (bodyParameters) => {
    const response = await deletePlayLists(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const deleteMusicPlaylist = createAsyncThunk(
  "playList/deleteMusic",
  async (bodyParameters) => {
    const response = await deleteMusicOnPLaylist(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
)
export const postLikePlayList = createAsyncThunk(
  "musics/postLike",
  async (bodyParameters) => {
    const response = await postChangePlayListLiked(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const playListSlice = createSlice({
  name: "playList",
  initialState: {
    playList: [],
    editedPlayList: {
      title: "",
      musics: [],
    },
    isEditing: false,
  },
  reducers: {
    setIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setEditedPlayList: (state, action) => {
      state.editedPlayList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlayList.fulfilled, (state, action) => {
      state.playList = action.payload.data.data;
    });
    builder.addCase(postPlayList.fulfilled, (state, action) => {
      state.playList.push(action.payload.data.data);
    });
    builder.addCase(updatePlayList.fulfilled, (state, action) => {
      
      const index = state.playList.findIndex(
        (playList) => playList._id === action.payload.data.data._id
      );
   
      state.playList[index] = action.payload.data.data;
    });
    builder.addCase(postLikePlayList.fulfilled, (state, action) => {
     
      const index = state.playList.findIndex(
        (playList) => playList._id === action.payload.data.data._id
      );
      
      state.playList[index] = action.payload.data.data;
    
    });
    builder.addCase(deletePlayList.fulfilled, (state, action) => {
      
      const index = state.playList.findIndex(
        (playList) => playList._id === action.payload.data.data._id
      );
    
      state.playList.splice(index, 1);
    });
    builder.addCase(deleteMusicPlaylist.fulfilled, (state, action) => {
     
      const index = state.playList.findIndex(
        (playList) => playList._id === action.payload.data.data._id
      );
    
      state.playList[index].musics.splice(action.payload.data.data.index, 1);
    });
  },
});

export const { setIsEditing, setEditedPlayList } = playListSlice.actions;

export default playListSlice.reducer;
