var jsmediatags = window.jsmediatags;

export const readMetatags = (file) => {
    return new Promise((resolve, reject) => {
        jsmediatags.read(file, {
            onSuccess: function (tag) {
                //! at the moment this is only for mp3 files
                resolve(tag.tags);
            },
            onError: function (error) {
                reject(error);
            },
        });
    });
}

export const readImage = (img) => {
    var picture = img
    var base64String = "";
    for (var i = 0; i < picture.data.length; i++) {
        base64String += String.fromCharCode(picture.data[i]);
    }
    var imageUri = "data:" + picture.format + ";base64," + window.btoa(base64String);
    return imageUri;

}

export const DataURIToBlob = (dataURI) =>{
    const splitDataURI = dataURI.split(',')
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}

export const genres = [

    {
        value: 'Rock',
        label: 'Rock',
    },
    {
        value: 'Jazz',
        label: 'Jazz',
    },
    {
        value: 'Reggaeton',
        label: 'Reggaeton',
    },
    {
        value: 'Metal',
        label: 'Metal',
    },
    {
        value: 'Pop',
        label: 'Pop',
    },
    {
        value: 'Rap',
        label: 'Rap',
    },
    {
        value: 'Country',
        label: 'Country',
    },
    {
        value: 'Blues',
        label: 'Blues',
    },
    {
        value: 'Classical',
        label: 'Classical',
    },
    {
        value: 'Folk',
        label: 'Folk',
    },
    {
        value: 'Funk',
        label: 'Funk',
    },
    {
        value: 'Hip-Hop',
        label: 'Hip-Hop',
    },
    {
        value: 'House',
        label: 'House',
    },
    {
        value: 'Indie',
        label: 'Indie',
    },
    {
        value: 'Punk',
        label: 'Punk',
    },
    {
        value: 'R&B',
        label: 'R&B',
    },
    {
        value: 'Reggae',
        label: 'Reggae',
    },
    {
        value: 'Other',
        label: 'Other',
    },
];


export const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "#efe7ff",
    alignContent: "center",
    justifyContent: "center",
    color: "#988dae",
    outline: "",
    transition: "border .24s ease-in-out",
    width: "800px",
    height: "350px",
};
export const focusedStyle = {
    borderColor: "#2196f3",
};

export const acceptStyle = {
    borderColor: "#00e676",
};

export const rejectStyle = {
    borderColor: "#ff1744",
};