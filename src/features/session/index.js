import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, getUser, signUp, updateUser } from './userAPI';

//thunks
export const check = createAsyncThunk('users/check', async (Key) => {
  const response = await checkUser(Key);
  return response.data;
});

export const getUserInfo = createAsyncThunk(
  'users/get',
  async (data) => {
    const response = await getUser(data);
    return response.data;
  }
);
export const updateUserInfo = createAsyncThunk(
  'users/update',
  async (data) => {
    const response = await updateUser(data);
    return response.data;
  }
);

export const singUser = createAsyncThunk(
  'users/singUser',
  async (data) => {
  
    const response = await signUp(data);

    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'session',
  initialState: {
    stateDispach: false,
    pass: '',
    privateKey: '',
    uid: '',
    publicKey: '',
    user: '',
    friends: 0,
    posts: 0,
    pendingFriends: [],
    allFriends: [],
    notificaciones: [0, 0, 0],
    avatar: '',
    pasdb: false,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setPublicKey: (state, action) => {
      state.publicKey = action.payload;
    },
    setPass: (state, action) => {
      state.privateKey = action.payload;
    },
    setAllUser: (state, action) => {
      state = {
        ...state,
        pass: localStorage.getItem('cabal_password'),
        uid: localStorage.getItem('cabal_password'),
        friends: action.data.friends.length,
        allFriends: action.data.friends,
        avatar: action.data.avatar,
        posts: action.data.posts.length,
      };
    },
    setPasdb: (state, action) => {
      state.pasdb = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(check.pending, (state, action) => {
      state.stateDispach = false;
    });
    builder.addCase(check.fulfilled, (state, action) => {

      if (action.payload.success) {
        state.publicKey = action.payload.data.publicKey;
        state.user = action.payload.data.alias;
        state.uid = action.payload.data.publicKey;
        state.pass = action.payload.data.password;
      }
      state.stateDispach = true;
    });
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      if(!action.payload.data) return 
      state.isLoggedIn = true;
      state.friends = action.payload.data.friends;
      state.posts = action.payload.data.posts.length;
      state.pendingFriends = action.payload.data.pendingfriends;
      state.avatar = action.payload.data.avatar;
      state.notificaciones = action.payload.data.images;
    });
    builder.addCase(singUser.fulfilled, (state, action) => {
      state.user = action.payload.data.username;
      state.uid = action.payload.data.uid;
    });
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
  
      state.notificaciones = action.payload.data.images;
      state.avatar = action.payload.data.avatar;
    });
  },
});

export const { setIsLoggedIn, setPublicKey, setPasdb, setPass } =
  userSlice.actions;

export default userSlice.reducer;
