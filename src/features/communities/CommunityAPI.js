import { toast } from "react-toastify";
import { URL } from "../../helper/Url";
var axios = require("axios");

export async function CreateCommunity(communityData) {
  var config = {
    method: "post",
    url: `${URL}/communities`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };
  return await toast.promise(axios(config), {
    pending: "Request to Create Community",
    success: "Your Community Request is completed correctly ",
    error: "Your community has been successfully created",
  });
}

export async function UpdateCommunity(communityData) {
 
  var config = {
    method: "patch",
    url: `${URL}/updateCommunity`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };
  return await toast.promise(axios(config), {
    pending: "Request to Update Community",
    success: "Your Community Request is completed correctly ",
    error: "Your community has been successfully updated",
  });
}

export async function UserCommunity(communityData) {
  var config = {
    method: "post",
    url: `${URL}/getCommunitiesUsers`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };
  return axios(config);
}

export async function JoinCommunity(communityData) {
  var config = {
    method: "post",
    url: `${URL}/acceptcommunity`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };

  return await toast.promise(axios(config), {
    pending: "Request Invite",
    success: "Your Request is completed correctly ",
    error: "Your request was denied",
  });
}

export async function LeaveCommunity(communityData) {
  var config = {
    method: "post",
    url: `${URL}/leavecommunity`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };

  return await toast.promise(axios(config), {
    pending: "Request Invite",
    success: "Your Request is completed correctly ",
    error: "Your request was denied",
  });
}

export async function GetCommunityInvite(communityData) {
  var config = {
    method: "post",
    url: `${URL}/getcommunitiesinvite`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };

  return await toast.promise(axios(config), {
    error: "It was not possible to upload your invitations ",
  });
}

export async function CancelCommunityInvite(communityData) {
  var config = {
    method: "post",
    url: `${URL}/cancelcommunityinvite`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };
  return await toast.promise(axios(config), {
    pending: "Request Cancel invite",
    success: "Community Invite Denied",
    error: "Rejected Cancel invite friend",
  });
}

export async function CheckCommunityInvite(communityData) {
  var config = {
    method: 'post',
    url: `${URL}/checkinvite`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: communityData
  };
  return await toast.promise(axios(config), {
    error: "Request Denied",
  });
}

export async function CreatePostCommunity(id, communityData) {
  var config = {
    method: "post",
    url: `${URL}/communities/${id}/addPosts`,
    headers: {
      "Content-Type": "application/json",
    },
    data: communityData,
  };

  return axios(config);
}

export async function CommunitySendInvite(communityData) {
  var config = {
    method: 'post',
    url: `${URL}/communitysendinvite`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: communityData
  };
  return await toast.promise(axios(config), {
    pending: "Request invite Sended",
    success: "Community Invite Sended Confirmed",
    error: "Rejected invite friend",
  });
}