import { toast } from "react-toastify";
import { URL } from "../../helper/Url";
var axios = require('axios');

export async function createPost(postData) {
    const config = {
        method: 'post',
        url: `${URL}/createpost`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: postData
    };

    const response = await toast.promise(axios(config),
        {
            pending: "Uploading Post...",
            success: "Post created Successfully",
            error: "Post failed to create",
        }
    )
    return response
}

export async function updatepost(postData) {
    const config = {
        method: 'patch',
        url: `${URL}/updatepost`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: postData
    };
    const response = await toast.promise(axios(config),
        {
            pending: "Uploading Post...",
            success: "Post Uploaded Successfully",
            error: "Post failed to upload",
        }
    )
    return response
}

export function getuserPosts(user) {
    const config = {
        method: 'post',
        url: `${URL}/wallposts`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: user
    };
    return axios(config)
}

export async function deletePost(id) {
    const config = {
        method: 'DELETE',
        url: `${URL}/deletepost`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: id
    };
    const response = await toast.promise(axios(config),
        {
            pending: "Deleting Post...",
            success: "Post Deleted Successfully",
            error: "Post failed to delete",
        }
    )
    return response
}


export function getCommentsPost(idPost) {

    const data = {
        "uid": idPost.post.uid,
        "_id": idPost.post._id
    }

    var config = {
        method: 'post',
        url: `${URL}/getpostcomments`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }

    return axios(config)
}



export async function addComment(commentData) {

    var config = {
        method: 'post',
        url: `${URL}/addcomments`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: commentData
    };
    const response = await toast.promise(axios(config),
        {
            pending: "Created comment...",
            success: "Comment created Successfully",
            error: "Comment failed to created",
        }
    )
    return response
}

export function likePost(postData) {

    const config = {
        method: 'patch',
        url: `${URL}/likepost`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: postData
    };
    return axios(config)
}

export function checklikePost(postData) {

    const config = {
        method: 'post',
        url: `${URL}/checklikepost`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: postData.likeData
    };
    return axios(config)
}