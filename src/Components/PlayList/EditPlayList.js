import { useDispatch, useSelector } from "react-redux";

import { updatePlayList, deleteMusicPlaylist } from "../../features/playList";
import {
    Box,
    CardMedia,
    Container,
    Typography,
    TableContainer,
    Paper,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { Container as ContainerSmooth, Draggable } from "react-smooth-dnd";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { toast } from "react-toastify";
import PlayCircleFilledOutlinedIcon from "@mui/icons-material/PlayCircleFilledOutlined";
import imagebackground from "../.././assets/img/triangles.png";
import StopIcon from "@mui/icons-material/Stop";

import {
    setPlay,
    setTrack,
    setPlaylist,
    setTrackImg,
    setTitle,
    setCurrentPlaylist,
} from "../../features/audioDisplay";
import { useTranslation } from "react-i18next";

const groupStyle = {
    overflow: "scroll",
};

const EditPlayList = ({ _id, title, musicPLaylist, author, likes, image }) => {
    const { uid, publicKey } = useSelector((state) => state.session);
    const { musics } = useSelector((state) => state.musics);
    const { play, currentPLaylist, playlist } = useSelector(
        (state) => state.audioDisplay
    );
    const playListall = useSelector((state) => state.playList);
    const [musicsFetch, setMusicsFetch] = useState(musics);
    const [musicData, setmusicPLaylist] = useState(musicPLaylist);
    const [controlPLay, setcontrolPLay] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        if (currentPLaylist === _id) {
            if (play) {
                setcontrolPLay(true);
            } else {
                setcontrolPLay(false);
            }
        }
    }, []);

    const handleOnSearch = (string, results) => {
        if (string.length > 2) {
            const filteredMusics = musics.filter((music) =>
                music.name.toLowerCase().includes(string.toLowerCase())
            );
            if (!filteredMusics.length) {
                toast.error(t("musics.notFound"));
                setMusicsFetch(musics);
            } else {
                setMusicsFetch(filteredMusics);
            }
        } else {
            setMusicsFetch(musics);
        }
    };
    const formatResult = ({ name }) => {
        return (
            <>
                <span style={{ display: "flex", textAlign: "left" }}>
                    {" "}
                    {name}{" "}
                </span>
            </>
        );
    };
    const deletemainmusic = async (musicId) => {
        const newMusicPLaylist = musicData.filter(
            (music) => music._id !== musicId
        );
        if (author === publicKey) {
            setmusicPLaylist(newMusicPLaylist);
            const bodyParameters = {
                musicId: musicId,
                id: _id,
                publicKey: publicKey,
                uid: uid,
            };
            dispatch(deleteMusicPlaylist(bodyParameters));
            toast.success(t("musics.msgDeleted"));
        } else {
            toast.error(t("musics.msgErrorDeleted"));
        }
    };

    const handleClickPLaylist = () => {
        if (!controlPLay) {
            dispatch(setPlaylist(musicData));
            dispatch(setTrack(0));
            dispatch(setTrackImg(musicData[0].image));
            dispatch(setTitle(musicData[0].name));
            dispatch(setCurrentPlaylist(_id));
            setcontrolPLay(true);
            dispatch(setPlay(true));
        } else {
            setcontrolPLay(false);
            dispatch(setPlay(false));
        }
    };

    return (
        <>
            <Container
                sx={{
                    height: "90vh",
                    width: "1000vh",
                    backgroundImage: `url(${imagebackground})`,
                    backgroundSize: "cover",
                    color: "white",
                    borderRadius: "10px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        position: "relative",
                        width: "100%",
                    }}
                >
                    <CardMedia
                        component="img"
                        image={image}
                        title={title}
                        sx={{
                            width: "200px",
                            height: "200px",
                            boxShadow: "0px 0px 10px #000",
                            borderRadius: "10px",
                            marginTop: "24px",
                        }}
                    />

                    <Typography variant="div">
                        <Typography
                            variant="h5"
                            sx={{
                                marginLeft: "24px",
                                marginTop: "24px",
                                color: "#d1c4e9",
                            }}
                        >
                            {t("playlists.playlist")}
                        </Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                marginTop: "24px",
                                marginLeft: "24px",
                                fontSize: "10vh",
                                fontWeight: "bold",
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="div"
                            sx={{
                                position: "absolute",
                                marginLeft: "70%",
                                marginTop: "-20px",
                            }}
                            onClick={handleClickPLaylist}
                        >
                            {controlPLay ? (
                                <StopIcon
                                    sx={{
                                        height: "50px",
                                        width: "50px",
                                        cursor: "pointer",
                                    }}
                                />
                            ) : (
                                <PlayCircleFilledOutlinedIcon
                                    sx={{
                                        height: "50px",
                                        width: "50px",
                                        cursor: "pointer",
                                    }}
                                />
                            )}
                        </Typography>
                    </Typography>
                </div>
                <div></div>

                <Box
                    sx={{
                        display: "flex",
                        height: "400px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "stretch",
                            marginTop: "50px",
                            marginRight: "50px",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                justifyContent: "center",
                                zIndex: "1",
                            }}
                        >
                            <ReactSearchAutocomplete
                                items={musics.name}
                                onSearch={handleOnSearch}
                                autoFocus
                                formatResult={formatResult}
                            />
                        </div>
                        <div style={groupStyle}>
                            <ContainerSmooth
                                groupName="1"
                                behaviour="copy"
                                getChildPayload={(index) => musicsFetch[index]}
                            >
                                {musicsFetch.map((music, index) => {
                                    return (
                                        <Draggable key={index}>
                                            <Box
                                                sx={{
                                                    margin: "5px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    height: "50px",
                                                    width: "40vh",
                                                    borderRadius: "10px",
                                                    backgroundImage:
                                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
                                                }}
                                                className="list-group-important"
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={music.img}
                                                    title={music.title}
                                                    sx={{
                                                        width: "40px",
                                                        height: "40px",
                                                        boxShadow:
                                                            "0px 0px 10px #000",
                                                        borderRadius: "10px",
                                                        alignSelf: "center",
                                                        justifySelf: "center",
                                                    }}
                                                />
                                                <Typography variant="div">
                                                    <Typography
                                                        variant="h5"
                                                        sx={{
                                                            fontSize: "10px",
                                                            paddingTop: "10px",
                                                        }}
                                                    >
                                                        {music.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="div"
                                                        sx={{
                                                            fontSize: "10px",
                                                            fontWeight: "bold",
                                                        }}
                                                    >
                                                        {music.artist}
                                                    </Typography>
                                                </Typography>
                                            </Box>
                                        </Draggable>
                                    );
                                })}
                            </ContainerSmooth>
                        </div>
                    </div>
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: "80vh",
                            marginLeft: "20px",

                            backgroundColor: "transparent",
                        }}
                    >
                        <ContainerSmooth
                            groupName="1"
                            getChildPayload={(i) => musicData[i]}
                            onDrop={(e) => {
                                const { removedIndex, addedIndex, payload } = e;
                                if (removedIndex === null) {
                                    if (
                                        musicData.find(
                                            (music) =>
                                                music.name === payload.name
                                        )
                                    ) {
                                        toast.warn(t("musics.exist"));
                                        return;
                                    }
                                    const newmusicPLaylist =
                                        Array.from(musicData);
                                    newmusicPLaylist.splice(
                                        addedIndex,
                                        0,
                                        payload
                                    );
                                    let musics = [];
                                    newmusicPLaylist.forEach((music) => {
                                        musics.push(music._id);
                                    });
                                    const data = {
                                        _id,
                                        title,
                                        musics,
                                        uid,
                                        publicKey,
                                    };

                                    if (author === publicKey) {
                                        dispatch(updatePlayList(data));
                                        setmusicPLaylist(newmusicPLaylist);
                                        toast.success(t("playlists.msgAdded"));
                                    } else {
                                        toast.warn(
                                            t("playlists.msgErrorAdded")
                                        );
                                    }
                                } else {
                                    const newmusicPLaylist =
                                        Array.from(musicData);
                                    newmusicPLaylist.splice(removedIndex, 1);
                                    newmusicPLaylist.splice(
                                        addedIndex,
                                        0,
                                        payload
                                    );
                                    let musics = [];
                                    newmusicPLaylist.forEach((music) => {
                                        musics.push(music._id);
                                    });
                                    const data = {
                                        _id,
                                        title,
                                        musics,
                                        uid,
                                        publicKey,
                                    };

                                    if (author === publicKey) {
                                        dispatch(updatePlayList(data));
                                        setmusicPLaylist(newmusicPLaylist);
                                    } else {
                                        setmusicPLaylist(newmusicPLaylist);
                                    }
                                }
                            }}
                        >
                            {musicData.length > 0 ? (
                                musicData.map((music, index) => {
                                    return (
                                        <Draggable key={index}>
                                            <Box
                                                sx={{
                                                    margin: "5px",
                                                    cursor: "pointer",
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",

                                                    height: "70px",
                                                    width: "auto",
                                                    borderRadius: "10px",
                                                    backgroundImage:
                                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
                                                }}
                                                className="list-group-important"
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={music.img}
                                                    title={music.title}
                                                    sx={{
                                                        width: "50px",
                                                        height: "50px",
                                                        boxShadow:
                                                            "0px 0px 10px #000",
                                                        borderRadius: "10px",
                                                        alignSelf: "center",
                                                        justifySelf: "start",
                                                        margin: "5px",
                                                    }}
                                                />

                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontSize: "10px",
                                                        paddingTop: "10px",
                                                        justifyContent:
                                                            "center",
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    {music.name}
                                                </Typography>
                                                <Typography
                                                    variant="div"
                                                    sx={{
                                                        fontSize: "10px",
                                                        fontWeight: "bold",
                                                        justifyContent:
                                                            "center",
                                                        alignSelf: "center",
                                                    }}
                                                >
                                                    {music.artist}
                                                </Typography>
                                                <Typography
                                                    variant="div"
                                                    onClick={() =>
                                                        deletemainmusic(
                                                            music._id
                                                        )
                                                    }
                                                    sx={{
                                                        alignSelf: "center",
                                                        marginRight: "10px",
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </Typography>
                                            </Box>
                                        </Draggable>
                                    );
                                })
                            ) : (
                                <div>
                                    <Draggable>
                                        <Box
                                            sx={{
                                                display: "flex",

                                                height: "70%",
                                                width: "100%",

                                                justifySelf: "center",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                borderRadius: "10px",
                                            }}
                                        >
                                            <Typography
                                                variant="h1"
                                                sx={{
                                                    fontSize: "80px",
                                                    paddingTop: "20%",

                                                    color: "#b39ddb",
                                                    alignSelf: "center",
                                                    justifySelf: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {t("playlists.msgAddedEmpty")}
                                            </Typography>
                                        </Box>
                                    </Draggable>
                                </div>
                            )}
                        </ContainerSmooth>
                    </TableContainer>
                </Box>
            </Container>
        </>
    );
};

export default EditPlayList;
