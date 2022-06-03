import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import socket from "../../helper/socket";
import {
  addFriend,
  CancelInvite,
  deleteFriend,
  getAllFriends,
  getPendingInvite,
  SendInvite,
} from "./friendsAPI";

export const sendinvite = createAsyncThunk(
  "friend/sendinvite",
  async (inviteData) => {
    const response = await SendInvite(inviteData);
    socket.emit("friends", inviteData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const cancelinvite = createAsyncThunk(
  "friend/cancelinvite",
  async (inviteData) => {
    await CancelInvite(inviteData);
    const response = await getPendingInvite(inviteData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const getpendingfriend = createAsyncThunk(
  "friend/getpendinginvite",
  async (inviteData) => {
    const response = await getPendingInvite(inviteData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const getallfriends = createAsyncThunk(
  "friend/getallfriends",
  async (inviteData) => {
    const response = await getAllFriends(inviteData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const addfriend = createAsyncThunk(
  "friend/addfriend",
  async (userData) => {
    const response = await addFriend(userData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const removefriend = createAsyncThunk(
  "friend/removefriend",
  async (userData) => {
    await deleteFriend(userData);
    const response = await getAllFriends(userData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const friendSlice = createSlice({
  name: "friends",
  initialState: {
    inviteFriends: [],
    friendsArray: [],
    removefriend: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cancelinvite.fulfilled, (state, action) => {
      state.inviteFriends = action.payload.data.data;
    });

    builder.addCase(getpendingfriend.fulfilled, (state, action) => {
      state.inviteFriends = action.payload.data.data;
    });

    builder.addCase(getallfriends.fulfilled, (state, action) => {
      state.friendsArray = action.payload.data.data.friends;
    });

    builder.addCase(addfriend.fulfilled, (state, action) => {
      state.removefriend = true;
    });

    builder.addCase(removefriend.fulfilled, (state, action) => {
      state.friendsArray = action.payload.data.data.friends;
    });
  },
});

export const {} = friendSlice.actions;

export default friendSlice.reducer;
