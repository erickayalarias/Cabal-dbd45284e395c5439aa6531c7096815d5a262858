import { URL } from '../../helper/Url';
var axios = require('axios');

export async function checkUser(bodyParameters) {
    return await axios.post(
        `${URL}/checkPublicKey`,
        { publicKey: bodyParameters }
    );
}

export async function signUp(bodyParameters) {

    return await axios.post(`${URL}/signup`, bodyParameters);
}

export async function getUser(data) {
    var config = {
        method: 'post',
        url: `${URL}/finduser`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    return axios(config)
}

export async function updateUser(data) {

    var config = {
        method: 'patch',
        url: `${URL}/users`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    return axios(config)
}