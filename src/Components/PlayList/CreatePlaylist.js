import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    TextField,
    Typography,
} from "@mui/material";
import { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postPlayList } from "../../features/playList";
import { uploadImage } from "../../helper/UploadImage";
import imagebackground from "../.././assets/img/triangles.png";
import { useTranslation } from "react-i18next";

export const CreatePlaylist = ({ handleCloseModal }) => {
    const [files, setFiles] = useState([]);
    const [titlePlaylist, setTitlePlaylist] = useState("");
    const { uid, publicKey } = useSelector((state) => state.session);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
    } = useDropzone({
        "image/jpeg": [],
        "image/png": [],
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
    });

    const handleClickPlayList = async () => {
        const imageUrl = await uploadImage(files[0]);
        const bodyParameters = {
            title: titlePlaylist,
            uid: uid,
            image: imageUrl,
            author: publicKey,
        };
        dispatch(postPlayList(bodyParameters));
        toast.success("Playlist created successfully");
        handleCloseModal();
    };

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    );
    return (
        <>
            <Card
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",

                    justifyContent: "center",
                    width: "700px",
                    padding: "20px",
                    backgroundImage: `url(${imagebackground})`,
                    backgroundSize: "cover",
                }}
            >
                <Typography gutterBottom variant="h4" component="div">
                    {t("playlists.create")}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        marginBottom: "60px",
                    }}
                >
                    {t("playlists.descriptionCreate")}
                </Typography>
                <CardContent
                    sx={{
                        marginBottom: "20px",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        alignItems: "center",
                        gridGap: "50px",
                    }}
                >
                    <div>
                        {files.length <= 0 && (
                            <div className="container">
                                <div {...getRootProps({ style })}>
                                    <input {...getInputProps()} />
                                    <p
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: "bold",
                                            color: "#fff",
                                            alignItems: "center",
                                        }}
                                    >
                                        {t("musics.dragAndDrop")}
                                    </p>
                                </div>
                            </div>
                        )}
                        {files.length > 0 && (
                            <CardMedia
                                component="img"
                                image={files[0].preview}
                                alt="album cover"
                                sx={{
                                    height: "250px",
                                    width: "250px",
                                    borderRadius: "10%",
                                }}
                            />
                        )}
                    </div>
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        value={titlePlaylist}
                        onChange={(e) => setTitlePlaylist(e.target.value)}
                    />
                </CardContent>
                <CardActions>
                    <Button
                        size="large"
                        sx={{
                            fontWeight: "bold",
                            width: "100%",
                        }}
                        variant="contained"
                        disabled={
                            titlePlaylist.length <= 0 || files.length <= 0
                        }
                        onClick={handleClickPlayList}
                    >
                        {t("playlists.createNewButton")}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

const baseStyle = {
    display: "flex",
    alignItems: "center",
    height: "250px",
    width: "250px",
    borderWidth: 2,
    borderRadius: "10%",
    borderColor: "grey",
    borderStyle: "dashed",
    backgroundColor: "grey",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
};

const focusedStyle = {
    borderColor: "#2196f3",
};

const acceptStyle = {
    borderColor: "#00e676",
};

const rejectStyle = {
    borderColor: "#ff1744",
};
