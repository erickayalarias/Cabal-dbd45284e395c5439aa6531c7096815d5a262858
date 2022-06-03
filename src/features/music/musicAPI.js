import axios from "axios";
import { toast } from "react-toastify";
import { URL, url_NFT } from "../../helper/Url";

export async function getMusics(bodyParameters) {
    const response = await axios.post(`${URL}/allMusics`);
    return response;
}

export async function uploadNft(bodyParameters) {
    const response = await toast.promise(
        axios.post(url_NFT, bodyParameters),
        {
            pending: "Uploading NFT/Music",
            success: "NFT/Music Uploaded",
            error: "NFT Rejected",
        }
    );

    return response;
}

export async function getSearchMusicsBySearchName(bodyParameters) {
    const { uid, name } = bodyParameters;
    const response = await axios.post(`${URL}/music/search`, {
        uid: uid,
        name: name,
    });
    return response;
}

export async function postChangeMusicLiked(bodyParameters) {
    const { uid, publicKey, _id } = bodyParameters;
    const response = await axios.post(`${URL}/music/${_id}/liked`, {
        uid: uid,
        publicKey: publicKey,
    });

    return response;
}

export async function mostLikedSongs() {
    await axios.get(`https://laravelcabal.herokuapp.com/api/musics`)
    const { data } = await axios.get(`https://laravelcabal.herokuapp.com/api/musics/mostLikes`)
    return data.data
}