import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import "../Music/music.css";
import styled from "styled-components";

import {
    setIsEditing,
    setEditedPlayList,
    deletePlayList,
    postLikePlayList,
} from "../../features/playList";

import {
    setTrack,
    setPlaylist,
    setTrackImg,
    setTitle,
    setPlay,
} from "../../features/audioDisplay";

import EditPlayList from "./EditPlayList";
import { CardMedia, Modal } from "@mui/material";

export const CardPlayList = ({ _id, title, musics, author, likes, image }) => {
    const { uid, publicKey } = useSelector((state) => state.session);
    const { playList } = useSelector((state) => state.playList);
    const audio = useSelector((state) => state.audioDisplay);
    const [like, setLike] = useState(likes.includes(publicKey));
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);

    const handleShowModal = () => {
        dispatch(setEditedPlayList({ _id, title, musics, author, likes }));
        dispatch(setIsEditing(true));
        setModal(!modal);
    };

    const handleClickPlayList = (liked) => {
        setLike(liked);
        const bodyParameters = {
            uid: uid,
            publicKey: publicKey,
            _id: _id,
        };
        dispatch(postLikePlayList(bodyParameters));
    };

    const handleDeletePlayList = () => {
        const bodyParameters = {
            uid: uid,
            _id: _id,
        };
        dispatch(deletePlayList(bodyParameters));
    };

    useEffect(() => {
        setLike(likes.includes(publicKey));
    }, [likes]);

    const handleListTrack = () => {
        if (musics.length > 0) {
            const index = playList.findIndex((play) => play._id === _id);
            dispatch(setTrack(""));
            dispatch(setPlaylist(""));
            dispatch(setPlaylist(playList[index].musics));
            if (playList[index].musics.length > 0) {
                dispatch(setTrack(0));
                dispatch(setTrackImg(playList[index].musics[0].imagen));
                dispatch(setTitle(playList[index].musics[0].name));
                if (playList[index].musics[0].img === audio.trackImg) {
                    dispatch(setPlay(false));
                }
            }
        }
    };

    return (
        <>
            <MusicRoot>
                <NavPlayList>
                    <Avatar onClick={handleListTrack}>
                        <CardMedia
                            image={image}
                            title="playlist"
                            style={{
                                height: "150px",
                                width: "150px",
                                borderRadius: "15%",
                                boxShadow: "0.1px 0.1px 5px #000000",
                                cursor: "pointer",
                            }}
                            className="img-thumbnail"
                        />
                    </Avatar>
                    <Paragraph>{title}</Paragraph>
                    <Paragraph>{musics.length}</Paragraph>
                    {title !== "likes" && (
                        <Like
                            onClick={handleClickPlayList}
                            src={
                                like
                                    ? "https://file.rendit.io/n/MnyutWNyI4cDmUoO7sA5.svg"
                                    : "https://file.rendit.io/n/sI5CWbdIfR9oqdN0ax5k.svg"
                            }
                        />
                    )}
                    <div
                        style={{
                            backgroundColor: "transparent",
                            color: "white",
                            display: "flex",
                            justifyContent: "space-between",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        {title !== "likes" && author === publicKey && (
                            <button
                                onClick={handleDeletePlayList}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                <AiOutlineDelete
                                    height={100}
                                    width={100}
                                    sx={{
                                        color: "white",
                                        backgroundColor: "transparent",
                                        border: "none",
                                    }}
                                />
                            </button>
                        )}
                        <button
                            onClick={handleShowModal}
                            style={{
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                border: "none",
                            }}
                        >
                            <QueueMusicIcon
                                sx={{
                                    color: "white",
                                }}
                            />
                        </button>
                        <Modal open={modal} onClose={handleShowModal}>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: "60px",
                                    borderRadius: "10px",
                                    position: "absolute",
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    margin: "auto",
                                    maxWidth: "50%",
                                }}
                            >
                                <EditPlayList
                                    image={image}
                                    title={title}
                                    musicPLaylist={musics}
                                    _id={_id}
                                    author={author}
                                />
                            </div>
                        </Modal>
                    </div>
                </NavPlayList>
            </MusicRoot>
        </>
    );
};

const MusicRoot = styled.div`
    box-shadow: 5px 4px 4px 0px rgba(0, 0, 0, 0.25);
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    align-items: center;
    margin: 15px auto;
    align-items: flex-end;
    border-radius: 30px;
    padding: 13px;
    height: 150px;
    width: 700px;
    @media only screen and (max-width: 1800px) {
        width: 600px;
    }
`;

const NavPlayList = styled.div`
    width: 95%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const Avatar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 18px;
    align-items: center;
`;

const Paragraph = styled.div`
    font-size: 20px;
    font-family: Roboto;
    font-weight: 400;
    color: #ffffff;
`;

const Like = styled.img`
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
