import { createSlice } from '@reduxjs/toolkit';

export const audioDisplaySlice = createSlice({
  name: 'audioDisplay',
  initialState: {
    playlist: [],
    track: '',
    trackImg: '',
    title: '',
    play: false,
    currentPLaylist: '',
    
  },
  reducers: {
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    setTrack: (state, action) => {
      state.track = action.payload;
    },
    setTrackImg: (state, action) => {
      state.trackImg = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setPlay: (state, action) => {
      state.play = action.payload;
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPLaylist = action.payload;
    }
  },
});

export const { setPlaylist, setTrack, setTrackImg, setTitle, setPlay, setCurrentPlaylist } =
  audioDisplaySlice.actions;

export default audioDisplaySlice.reducer;
