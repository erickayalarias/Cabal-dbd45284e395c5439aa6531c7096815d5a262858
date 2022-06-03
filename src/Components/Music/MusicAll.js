import { useDispatch, useSelector } from "react-redux";

import { getMusic } from "../../features/music";

import { CardMusic } from "./CardMusic";

import { useEffect, useState } from "react";

import "./music.css";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

export const MusicAll = () => {
    const { uid } = useSelector((state) => state.session);
    const { musics } = useSelector((state) => state.musics);
    const [musicstate, setmusicstate] = useState(musics);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getMusic(uid));
    }, []);

    useEffect(() => {
        setmusicstate(musics);
    }, [musics]);

    const handleOnSearch = (string) => {
        if (string === "") {
            setmusicstate(musics);
        }
        if (string !== "") {
            const newMusic = musics.filter((music) =>
                music.name.toLowerCase().includes(string)
            );
            const musicgenere = musics.filter((music) =>
                music.genere.toLowerCase().includes(string)
            );
            if (newMusic.length > 0) {
                setmusicstate(newMusic);
            } else {
                setmusicstate(musics);
            }
            if (musicgenere.length > 0) {
                setmusicstate(musicgenere);
            }else{
                setmusicstate(musics);
            }
            
        }
    };
    return (
        <div>
            <Box
                sx={{
                    width: "920px",
                    margin: "0 auto",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        width: "95%",
                        marginBottom: "30px",
                    }}
                    className="search-bar"
                >
                    <ReactSearchAutocomplete onSearch={handleOnSearch} />
                </div>
                <Grid
                    container
                    spacing={2}
                    xs={9}
                    sm={9}
                    md={12}
                    lg={12}
                    xl={20}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: "80px",
                        "@media screen and (max-width: 600px)": {
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                    item
                >
                    {musicstate &&
                        musicstate.map(
                            ({
                                _id,
                                artist,
                                name,
                                genere,
                                img,
                                file,
                                likes,
                                openseaLink,
                            }) => (
                                <Grid
                                    key={_id}
                                    xs={5}
                                    sm={5}
                                    md={5}
                                    lg={6}
                                    xl={4}
                                    item
                                >
                                    <CardMusic
                                        _id={_id}
                                        artist={artist}
                                        name={name}
                                        genere={genere}
                                        img={img}
                                        file={file}
                                        likes={likes}
                                        openseaLink={openseaLink}
                                    />
                                </Grid>
                            )
                        )}
                </Grid>
            </Box>
        </div>
    );
};
