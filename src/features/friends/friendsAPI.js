import axios from 'axios';
import { toast } from 'react-toastify';
import { URL } from '../../helper/Url';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function SendInvite(inviteData) {
  const config = {
    method: 'post',
    url: URL + '/invitefriend',
    headers,
    data: inviteData,
  };

  return await toast.promise(axios(config), {
    pending: 'Request send invite friend',
    success: 'Sended invite friend',
    error: 'Rejected send invite friend',
  });
}

export async function CancelInvite(inviteData) {
  const config = {
    method: 'post',
    url: URL + '/cancelinvitefriend',
    headers,
    data: inviteData,
  };
  return await axios(config);
}

export async function getPendingInvite(inviteData) {
  const config = {
    method: 'post',
    url: URL + '/getpendingfriend',
    headers,
    data: inviteData,
  };
  return axios(config);
}

export async function getAllFriends(userData) {
  const config = {
    method: 'post',
    url: URL + '/getallfriends',
    headers,
    data: userData,
  };
  return axios(config);
}

export async function addFriend(userData) {
  const config = {
    method: 'post',
    url: URL + '/addfriend',
    headers,
    data: userData,
  };
  return await toast.promise(axios(config), {
    success: 'Added invite friend',
    error: 'Rejected add invite friend',
  });
}

export async function deleteFriend(userData) {
  var config = {
    method: 'delete',
    url: URL + '/removefriend',
    headers,
    data: userData,
  };
  return await toast.promise(axios(config), {
    pending: 'Request delete invite friend',
    success: 'Deleted invite friend',
    error: 'Rejected delete invite friend',
  });
}
