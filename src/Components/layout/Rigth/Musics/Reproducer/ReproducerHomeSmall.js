import React, { useEffect, useRef, useState } from "react";
import "./output.css";
import styled from "styled-components";
import AudioPlayer, { RHAP_UI }  from "react-h5-audio-player";
import { useDispatch, useSelector } from "react-redux";
import { CardMedia } from "@mui/material";
import {
    setTrack,
    setTrackImg,
    setTitle,
    setPlay,
} from "../../../../../features/audioDisplay";

export const PlayBar1 = ({ layoutType }) => {
    const {
        track = 0,
        title,
        playlist,
        play,
    } = useSelector((state) => state.audioDisplay);
    const dispatch = useDispatch();
    const [currentPLaylist, setcurrentPLaylist] = useState("");
    const player = useRef();
    useEffect(() => {
        if (play) {
            player.current.audio.current.play();
        } else {
            player.current.audio.current.pause();
        }
    }, [play]);

    useEffect(() => {
        if (playlist.length > 0) {
            setcurrentPLaylist(playlist[track].file);
        }
    }, [playlist, track]);

    const handleClickPrevious = () => {
        if (track - 1 < 0) {
            setcurrentPLaylist(playlist[playlist.length - 1].file);
            dispatch(setTrack(playlist.length - 1));
            dispatch(setTrackImg(playlist[playlist.length - 1].img));
            dispatch(setTitle(playlist[playlist.length - 1].name));
            dispatch(setPlay(true));
        } else {
            setcurrentPLaylist(playlist[track - 1].file);
            dispatch(setTrack(track - 1));
            dispatch(setTrackImg(playlist[track - 1].img));
            dispatch(setTitle(playlist[track - 1].name));
            dispatch(setPlay(true));
        }
    };
    const handleClickNext = () => {
        if (track + 1 > playlist.length) {
            setcurrentPLaylist(playlist[0].file);
            dispatch(setTrack(0));
            dispatch(setTrackImg(playlist[0].img));
            dispatch(setTitle(playlist[0].name));
            dispatch(setPlay(true));
        } else {
            setcurrentPLaylist(playlist[track + 1].file);
            dispatch(setTrack(track + 1));
            dispatch(setTrackImg(playlist[track + 1].img));
            dispatch(setTitle(playlist[track + 1].name));
            dispatch(setPlay(true));
        }
    };

    const handleEnded = () => {
        if (track + 1 > playlist.length) {
            setcurrentPLaylist(playlist[0].file);
            dispatch(setTrack(0));
            dispatch(setTrackImg(playlist[0].img));
            dispatch(setTitle(playlist[0].name));
        } else {
            setcurrentPLaylist(playlist[track + 1].file);
            dispatch(setTrack(track + 1));
            dispatch(setTrackImg(playlist[track + 1].img));
            dispatch(setTitle(playlist[track + 1].name));
        }
    };

    return (
        <>
            <PlayBarRoot>
                <AudioPlayer
                    src={currentPLaylist}
                    showSkipControls={true}
                    onClickNext={handleClickNext}
                    onClickPrevious={handleClickPrevious}
                    togglePlay={(e) => console.log(e)}
                    onPlay={(e) => dispatch(setPlay(true))}
                    onPause={(e) => dispatch(setPlay(false))}
                    onEnded={handleEnded}
                    onError={() => console.log("onError")}
                    style={{ backgroundColor: "#000" }}
                    layout={layoutType}
                    ref={player}
                    customAdditionalControls={
                        [
                            RHAP_UI.LOOP,
                            <>
                            {title && (
                                <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                            alignItems: "center",
                                // width: "10px",
                            }}
                        >
                            
                            <CardMedia
                                image={playlist[track].img}
                                title="playlist"
                                sx={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "10%",
                                    marginLeft: "7px",
                                }}
                            />
                            <div
                                style={{
                                    height: "30px",

                                                marginTop: "10px",
                                                maxWidth: "38px",
                                                marginLeft: "10px",
                                        fontWeight: "bold",
                            }}
                            >
                                {title}
                            </div>
                            </div>)
                                 }
                            </>     
    ]
  }
                />
            </PlayBarRoot>
        </>
    );
};
export const PlayBarRoot = styled.div`
    color: white;
`;
