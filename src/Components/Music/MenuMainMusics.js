import { useState } from "react";
import { useTranslation } from "react-i18next";

import CardMedia from "@mui/material/CardMedia";
import { MusicAll } from "./MusicAll";
import { PlayListAll } from "../PlayList/PlayListAll";

import styled from "styled-components";
import { ModalUpload } from "./ModalUpload";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    setPlaylist,
    setTrack,
    setTrackImg,
    setTitle,
} from "../../features/audioDisplay";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";

const useStyles = makeStyles(() => ({
    root: {
        color: "white",
        "&$selected": {
            color: "#cc33ff",
        },
    },
    selected: {},
}));

export const MenuMainMusics = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [selectOption, setSelectOption] = useState("musics");
    const { t } = useTranslation();
    const { mostLiked } = useSelector((state) => state.musics);
    const handleChange = (event, newValue) => {
        setSelectOption(newValue);
    };
    const handleMostLiked = (index) => {
        dispatch(setPlaylist(mostLiked));
        dispatch(setTrack(index));
        dispatch(setTrackImg(mostLiked[index].img));
        dispatch(setTitle(mostLiked[index].name));
    };
    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "30px",
                }}
            >
                <Typography
                    variant="div"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        backgroundImage:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%);",
                        backgroundSize: "cover",
                        borderRadius: "10px",
                        width: "auto",
                    }}
                    className="scroll-container"
                >
                    <Typography variant="h6">
                        {t("musics.mostLikedSongs")}
                    </Typography>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "170px",
                            overflowX: "scroll",
                            // justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        {mostLiked.length > 0 &&
                            mostLiked.map((music, index) => {
                                return (
                                    <div
                                        style={{
                                            transition: "0.3s",
                                            cursor: "pointer",
                                            marginTop: "10px",
                                        }}
                                        className="imageMostLikeds"
                                        key={music._id}
                                    >
                                        <CardMedia
                                            image={music.img}
                                            title={music.name}
                                            sx={{
                                                width: "135px",
                                                height: "135px",
                                                borderRadius: "10%",
                                                margin: "1px 5px",
                                                //hover effect a little bigger
                                                transition: "all 0.5s ease",
                                            }}
                                            onClick={() =>
                                                handleMostLiked(index)
                                            }
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </Typography>
            </div>
            <MusicRoot>
                <BottomNavigation
                    sx={{
                        width: 400,
                        borderColor: "#cc33ff",
                        borderStyle: "solid",
                        borderWidth: 2,
                        borderRadius: 5,
                    }}
                    value={selectOption}
                    onChange={handleChange}
                >
                    <BottomNavigationAction
                        classes={classes}
                        label={t("playLists")}
                        value={t("playLists.nav")}
                        icon={<ListAltIcon />}
                    />
                    <BottomNavigationAction
                        classes={classes}
                        label={t("musics.nav")}
                        value="musics"
                        icon={<LibraryMusicIcon />}
                    />
                    <ModalUpload />
                </BottomNavigation>
            </MusicRoot>

            <div></div>
            {selectOption === "musics" && <MusicAll />}
            {selectOption === t("playLists.nav") && <PlayListAll />}
        </div>
    );
};

const MusicRoot = styled.div`
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 15px auto;
    margin-bottom: 30px;
    width: 200px;
    border-radius: 30px;
    padding: 13px;
    @media only screen and (max-width: 1800px) {
        width: 300px;
    }
`;
