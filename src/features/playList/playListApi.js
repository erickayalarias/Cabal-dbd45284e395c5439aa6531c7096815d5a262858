import axios from "axios";
import { URL } from "../../helper/Url";

export const getPlayLists = (bodyParameters) => {
    return axios.post(`${URL}/playlist`, {
        publicKey: bodyParameters,
    });
};

export const postPlayLists = (bodyParameters) => {
    const { uid, title, author, image } = bodyParameters;
    return axios.post(`${URL}/addPlaylist`, {
        uid: uid,
        title: title,
        image: image,
        author: author,
    });
};

export const updatePlayLists = (bodyParameters) => {
    const { _id, title, musics, uid, publicKey } = bodyParameters;
    return axios.patch(`${URL}/playlist/${_id}`, {
        uid: uid,
        title: title,
        musics: musics,
        publicKey: publicKey,
    });
};

export const deletePlayLists = (bodyParameters) => {
    const { uid, _id } = bodyParameters;
    return axios.delete(`${URL}/playlist/${_id}`, {
        data: { uid: uid },
    });
};

export async function postChangePlayListLiked(bodyParameters) {
    const { uid, publicKey, _id } = bodyParameters;
    const response = await axios.post(`${URL}/playlist/${_id}/liked`, {
        uid: uid,
        publicKey: publicKey,
    });
    return response;
}


export const deleteMusicOnPLaylist = (bodyParameters) => {
    const { musicId, id, publicKey, uid } = bodyParameters;
    return axios.post(`${URL}/playlistMusic/${id}`, {
        musicId: musicId,
        uid: uid,
        publicKey: publicKey,
    });
}