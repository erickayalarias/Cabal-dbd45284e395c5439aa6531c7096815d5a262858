import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { postLikeMusic } from "../../features/music";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseOutlinedIcon from "@mui/icons-material/PauseOutlined";
import "./music.css";
import barco from "../../assets/img/barco.jpg";

import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";

import {
    setTrack,
    setPlaylist,
    setTrackImg,
    setTitle,
    setPlay,
} from "../../features/audioDisplay";

import { getPlayList } from "../../features/playList";

export const CardMusic = ({
    _id,
    artist,
    name,
    genere,
    img,
    file,
    likes,
    openseaLink,
}) => {
    const { uid, publicKey } = useSelector((state) => state.session);
    const audio = useSelector((state) => state.audioDisplay);
    const { musics } = useSelector((state) => state.musics);
    const [like, setLike] = useState(likes.includes(publicKey));
    const dispatch = useDispatch();

    const index = musics.findIndex((music) => music._id === _id);

    const clickIcon = () => {
        dispatch(setPlaylist(musics));
        dispatch(setTrack(index));
        dispatch(setTrackImg(img));
        dispatch(setTitle(name));
        dispatch(setPlay(true));
        if (audio.track === index && audio.play) {
            dispatch(setPlay(false));
        } else if (audio.track !== index) {
            dispatch(setPlay(true));
        }
    };

    const handleChangeLike = (liked) => {
        setLike(liked);
        const bodyParameters = {
            uid: uid,
            publicKey: publicKey,
            _id: _id,
        };

        dispatch(postLikeMusic(bodyParameters));
    };

    useEffect(() => {
        setLike(likes.includes(publicKey));
        dispatch(getPlayList(publicKey));
    }, [likes, publicKey, dispatch]);

    return (
        <>
            <Grid item>
                <Card
                    sx={{
                        display: "flex",
                        justifyContent: "start",
                        margin: "10px",
                        borderRadius: "30px",
                        boxShadow: "5px 1px 18px 3px #050505",
                        height: "80%",
                        backgroundImage:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
                    }}
                    variant="elevation"
                >
                    <div className="profile-img-container" onClick={clickIcon}>
                        <CardMedia
                            component="img"
                            className="img-thumbnail img-circle img-responsive"
                            sx={{
                                width: "8rem",
                                height: "8rem",
                                marginTop: "10px",
                                marginBottom: "10px",
                                borderRadius: "30px",
                                marginLeft: "10px",
                                transition: "transform 0.40s ease-in-out",
                            }}
                            image={img}
                            alt="Live from space album cover"
                        />
                        <div className="profile-img-i-container">
                            <i>
                                {audio.track !== index ||
                                audio.play === false ? (
                                    <PlayArrowOutlinedIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "#c5cae9",
                                        }}
                                    />
                                ) : (
                                    <PauseOutlinedIcon
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            color: "#c5cae9",
                                        }}
                                    />
                                )}
                            </i>
                        </div>
                    </div>
                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            position: "relative",
                            width: "100%",
                        }}
                    >
                        <Typography
                            component="div"
                            variant="h5"
                            sx={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                // justifyContent: "space-between",
                            }}
                        >
                            {name}
                            <div
                                style={{
                                    // display: "flex",
                                    // justifyContent: "flex-end",
                                    position: "absolute",
                                    right: "10px",
                                    cursor: "pointer",
                                }}
                            >
                                {like ? (
                                    <FavoriteIcon
                                        onClick={() => handleChangeLike(true)}
                                        sx={{
                                            color: "red",
                                        }}
                                    />
                                ) : (
                                    <FavoriteBorderIcon
                                        onClick={() => handleChangeLike(false)}
                                    />
                                )}
                            </div>
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "12px",
                            }}
                        >
                            {artist}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            component="div"
                            sx={{
                                fontWeight: "bold",
                                fontSize: "12px",
                                display: "flex",
                                flexDirection: "row",
                                color: "#c5cae9",
                                cursor: "pointer",
                                marginTop: "10px",
                            }}
                        >
                            <a
                                href={openseaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opensea-link"
                            >
                                OpenSea
                                <CardMedia
                                    component="img"
                                    image={barco}
                                    alt="OpenSea"
                                    sx={{
                                        height: "20px",
                                        width: "20px",
                                        marginLeft: "5px",
                                        borderRadius: "50%",
                                    }}
                                />
                            </a>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};
