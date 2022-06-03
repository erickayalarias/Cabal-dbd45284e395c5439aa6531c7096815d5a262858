import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMusics,
  getSearchMusicsBySearchName,
  postChangeMusicLiked,
  uploadNft,
  mostLikedSongs
} from "./musicAPI";
export const getMusic = createAsyncThunk("musics/get", async () => {
  const response = await getMusics();
  return JSON.parse(JSON.stringify(response));
});

export const getMusicSearch = createAsyncThunk(
  "musics/getSearch",
  async (bodyParameters) => {
    const response = await getSearchMusicsBySearchName(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const postLikeMusic = createAsyncThunk(
  "musics/postLike",
  async (bodyParameters) => {
    const response = await postChangeMusicLiked(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const uploadDataMusic = createAsyncThunk(
  "musics/upload",
  async (bodyParameters) => {
    const response = await uploadNft(bodyParameters);
    return JSON.parse(JSON.stringify(response));
  }
);

export const mostLikedMusic = createAsyncThunk(
  "musics/mostLiked",
  async () => {
    const response = await mostLikedSongs();
    return JSON.parse(JSON.stringify(response));
  }
);


export const musicSlice = createSlice({
  name: "musics",
  initialState: {
    musics: [],
    mostLiked: [],
  },
  reducers: {
    setListMusics: (state, action) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMusic.fulfilled, (state, action) => {
      state.musics = action.payload.data.data;
    });
    builder.addCase(uploadDataMusic.fulfilled, (state, action) => {
      state.musics.push(action.payload.data.data);
    });
    builder.addCase(getMusicSearch.fulfilled, (state, action) => {
      state.musics = action.payload.data.data;
    });
    builder.addCase(postLikeMusic.fulfilled, (state, action) => {
      //TODO find index of music
      const index = state.musics.findIndex(
        (music) => music._id === action.payload.data.data._id
      );
      // TODO update music
      state.musics[index] = action.payload.data.data;
    });
    builder.addCase(mostLikedMusic.fulfilled, (state, action) => {
      state.mostLiked = action.payload
    });
  },
});

export const { setListMusics } = musicSlice.actions;

export default musicSlice.reducer;
