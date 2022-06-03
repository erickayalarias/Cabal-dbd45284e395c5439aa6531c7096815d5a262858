import { configureStore } from "@reduxjs/toolkit";
import session from "../session";
import musics from "../music";
import playList from "../playList";
import posts from "../Posts";
import audioDisplay from '../audioDisplay';
import chat from '../chat';
import friends from "../friends";
import communities from "../communities";

export default configureStore({
  reducer: {
    session,
    musics,
    playList,
    posts,
    audioDisplay,
    chat,
    friends,
    communities,
  },
});
