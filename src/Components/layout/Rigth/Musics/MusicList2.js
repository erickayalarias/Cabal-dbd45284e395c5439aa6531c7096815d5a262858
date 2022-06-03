import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MusicCard } from "./MusicCard";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import "./musicss.css";
import { CardMedia } from "@mui/material";
import {
  setTrack,
  setTrackImg,
  setTitle,
  setPlaylist,
} from "../../../../features/audioDisplay";
import { useTranslation } from "react-i18next";

export default function ControlledAccordions() {
  const { mostLiked } = useSelector((state) => state.musics);

  const { playList } = useSelector((state) => state.playList);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const [expanded, setExpanded] = React.useState("panel1");
  const { t } = useTranslation();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleClickPLaylist = (id) => {
    const playlist = playList.find((playlist) => playlist._id === id);
    dispatch(setPlaylist(playlist.musics));
    dispatch(setTrack(0));
    dispatch(setTrackImg(playlist.musics[0].img));
    dispatch(setTitle(playlist.musics[0].name));
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <Acordeon>
        <Text1>{t("musics.header")}</Text1>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          style={{
            backgroundColor: "#000000",
            background: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {t("musics.mostLikedSongs")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              height: 340,
            }}
            className="scrollbar"
          >
            {mostLiked.map((music, index) => {
              return (
                <div key={music._id}>
                  <MusicCard
                    file={music.file}
                    key={music._id}
                    descript={music.artist}
                    title={music.name}
                    img={music.img}
                    index={index}
                    liked={true}
                  />
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          sx={{
            backgroundColor: "#000000",
            background: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {t("musics.favourite")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              height: 340,
            }}
            className="scrollbar"
          >
            {playList[0] &&
              playList[0].musics.map((music, index) => {
                return (
                  <div key={music._id}>
                    <MusicCard
                      file={music.file}
                      key={music._id}
                      descript={music.artist}
                      title={music.name}
                      img={music.img}
                      index={index}
                    />
                  </div>
                );
              })}
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          style={{
            //background transparent
            backgroundColor: "black",
            background: "none",
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "100%", flexShrink: 0 }}>
              {t("playlists.playlistsLiked")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              height: 340,
            }}
            className="scrollbar"
          >
            {playList &&
              playList.map((playlist, index) => {
                if (index === 0) {
                  return null;
                }
                if (playlist.likes.includes(user.publicKey)) {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        cursor: "pointer",
                        margin: "10px",
                      }}
                      onClick={() => handleClickPLaylist(playlist._id)}
                      key={playlist._id}
                    >
                      <CardMedia
                        image={playlist.image}
                        title={playlist.title}
                        sx={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "10px",
                        }}
                      />
                      <Typography
                        sx={{
                          width: "33%",
                          flexShrink: 0,
                          marginLeft: "15px",
                        }}
                      >
                        {playlist.title}
                      </Typography>
                    </div>
                  );
                }
                return null;
              })}
          </AccordionDetails>
        </Accordion>
      </Acordeon>
    </ThemeProvider>
  );
}

const Acordeon = styled.div`
  background-color: #000000;
  color: #ffffff;
  width: 100%;
`;
const Text1 = styled.div`
  width: 221px;
  height: 49px;
  font-size: 40px;
  font-family: Roboto;
  font-weight: 700;
  color: #ffffff;
  align-self: flex-start;
  margin: 10px 25px;
`;
