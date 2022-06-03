import axios from "axios";
import { toast } from "react-toastify";
import { URL, URL_Chat } from "../../helper/Url";

export const getUsers = async (publicKey) => {
    const response = await axios.get('https://nodesocketcabal.herokuapp.com/user?user=' + publicKey);
    return response.data
}

export const addUser = async (user) => {
    const response = await axios.post('https://nodesocketcabal.herokuapp.com/user', user);
    return response.data
}

export const updateUser = async (user) => {
    const response = await axios.patch('https://nodesocketcabal.herokuapp.com/user', user);
    return response.data
}

export const getChats = async (userId) => {
    const response = await axios.get(`https://nodesocketcabal.herokuapp.com/chat/${userId}`);
    return response.data
}

export const addChat = async (users) => {
    const response = await axios.post(`https://nodesocketcabal.herokuapp.com/chat`, users);
    return response.data
}

export const delChat = async (id) => {
    const response = await axios.delete(`https://nodesocketcabal.herokuapp.com/chat/${id}`);
    return response.data
}

export const getMessageChat = async (chatId) => {
    const response = await axios.get(`https://nodesocketcabal.herokuapp.com/message?chat=${chatId}`);
    return response.data
}

export const addMessageChat = async (message) => {
    const config = {
        method: 'post',
        url: `https://nodesocketcabal.herokuapp.com/message`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: message
    };
    const response = await axios(config);
    return response.data
}

