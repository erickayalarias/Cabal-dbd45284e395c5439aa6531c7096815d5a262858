import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addMessageChat, getChats, getMessageChat, getUsers, addUser, addChat, delChat, updateUser } from './chatAPI';

//TODO    users
export const getUsersChats = createAsyncThunk(
  "chat/getUsers",
  async (userPublickey) => {
    const response = await getUsers(userPublickey);
    return JSON.parse(JSON.stringify(response));
  });

export const creaChatUser = createAsyncThunk(
  "chat/createUser",
  async (user) => {
 
    const response = await addUser(user);
    return JSON.parse(JSON.stringify(response));
  })

export const getUserFilter = createAsyncThunk(
  "chat/getUsersFilter",
  async (userPublickey) => {
 
    const response = await getUsers(userPublickey);
    return JSON.parse(JSON.stringify(response));
  });

export const updateUserChat = createAsyncThunk(
  "chat/updateUser",
  async (user) => {
    const response = await updateUser(user);
    return JSON.parse(JSON.stringify(response));
  })

//TODO    messages
export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (chatId) => {
    const response = await getMessageChat(chatId);
    return JSON.parse(JSON.stringify(response));
  });

export const addMessages = createAsyncThunk(
  "chat/addMessages",
  async ({ chat, user, message }) => {
    if (!message || !chat || !user) {
    
      return;
    }
    const response = await addMessageChat({ chat, user, message });
    return JSON.parse(JSON.stringify(response));
  });

//TODO    chats
export const getUserChats = createAsyncThunk(
  "chat/getChats",
  async (userId) => {
    const response = await getChats(userId);
    return JSON.parse(JSON.stringify(response));
  });

export const creaChat = createAsyncThunk(
  "chat/createChat",
  async (user) => {
    const response = await addChat(user);
    return JSON.parse(JSON.stringify(response));
  })

export const deleteChat = createAsyncThunk(
  "chat/deleteChat",
  async (id) => {
    const response = await delChat(id);
    return JSON.parse(JSON.stringify(response));
  })

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    "user": "",
    "chats": [],
    "messages": [],
    socket: null,
    actualChat: {},
    createChat: []
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setuser: (state, action) => {
      state.actualChat = action.payload
    },
    setCreateChat: (state, action) => {
      state.createChat = []
    },
  }, extraReducers: (builder) => {
    builder.addCase(getUsersChats.fulfilled, (state, action) => {
      state.user = action.payload.body[0];
    });
    builder.addCase(getUserChats.fulfilled, (state, action) => {
      state.chats = (action.payload.body)
    })
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.messages = action.payload.body;
    });
    builder.addCase(getUserFilter.fulfilled, (state, action) => {
      state.createChat = [...state.createChat, action.payload.body[0]]
    });
  },
});

export const { setSocket, setuser, setCreateChat } = chatSlice.actions;

export default chatSlice.reducer;
