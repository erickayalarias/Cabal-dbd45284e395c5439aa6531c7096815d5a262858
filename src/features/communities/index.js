import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateCommunity,
  CreatePostCommunity,
  GetCommunityInvite,
  JoinCommunity,
  UserCommunity,
  CancelCommunityInvite,
  LeaveCommunity,
  UpdateCommunity,
  CommunitySendInvite,
} from "./CommunityAPI";

export const createcommunity = createAsyncThunk(
  "community/createCommunity",
  async (communityData) => {
    await CreateCommunity(communityData);
    const user = {
      uid: communityData.uid,
      publicKey: communityData.adminPublicKey,
    };
    const response = await UserCommunity(user);
    return JSON.parse(JSON.stringify(response));
  }
);

export const updatecommunity = createAsyncThunk(
  "community/updateCommunity",
  async (communityData) => {
    const response = await UpdateCommunity(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const getusercommunities = createAsyncThunk(
  "community/usercommunities",
  async (communityData) => {
    const response = await UserCommunity(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const joincommunities = createAsyncThunk(
  "community/joincommunities",
  async (communityData) => {
    await JoinCommunity(communityData);
    const response = await UserCommunity(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const leavecommunities = createAsyncThunk(
  "community/leavecommunities",
  async (communityData) => {
    await LeaveCommunity(communityData);
    const response = await UserCommunity(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const getcommunitiesinvite = createAsyncThunk(
  "community/getcommunitiesinvite",
  async (communityData) => {
    const response = await GetCommunityInvite(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const createpostcommunity = createAsyncThunk(
  "community/createpostcommunity",
  async (post) => {
    const { id, ...rest } = post;
    const response = await CreatePostCommunity(id, rest);
    return JSON.parse(JSON.stringify(response));
  }
);

export const communitysendinvite = createAsyncThunk(
  "community/communitysendinvite",
  async (communityData) => {
    const response = await CommunitySendInvite(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const cancelcommunitiesinvite = createAsyncThunk(
  "community/cancelcommunitiesinvite",
  async (communityData) => {
    await CancelCommunityInvite(communityData);
    const response = await GetCommunityInvite(communityData);
    return JSON.parse(JSON.stringify(response));
  }
);

export const CommunitySlice = createSlice({
  name: "communities",
  initialState: {
    mycommunities: [],
    communitiesInvite: [],
    community: [],
  },
  reducers: {
    getComunity: (state, action) => {
      state.community = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createcommunity.fulfilled, (state, action) => {
      state.mycommunities = action.payload.data.data;
    });

    builder.addCase(updatecommunity.fulfilled, (state, action) => {
      const index = state.mycommunities.findIndex(
        (myCommunity) => myCommunity._id === action.payload._id
      );
      state.mycommunities[index] = action.payload;
    });

    builder.addCase(getusercommunities.fulfilled, (state, action) => {
      state.mycommunities = action.payload.data.data;
    });

    builder.addCase(joincommunities.fulfilled, (state, action) => {
      state.mycommunities = action.payload.data.data;
    });

    builder.addCase(leavecommunities.fulfilled, (state, action) => {
      state.mycommunities = action.payload.data.data;
    });

    builder.addCase(getcommunitiesinvite.fulfilled, (state, action) => {
      state.communitiesInvite = action.payload.data.data;
    });

    builder.addCase(createpostcommunity.fulfilled, (state, action) => {
      const index = state.mycommunities.findIndex(
        (myCommunity) => myCommunity._id === action.payload.data.data._id
      );
      state.mycommunities[index] = action.payload.data.data;
    });

    builder.addCase(cancelcommunitiesinvite.fulfilled, (state, action) => {
      state.communitiesInvite = action.payload.data.data;
    });
  },
});

export const { getComunity } = CommunitySlice.actions;

export default CommunitySlice.reducer;
