import { useDropzone } from "react-dropzone";
import { useState, useMemo, useEffect } from "react";
import {
  readMetatags,
  readImage,
  genres,
  DataURIToBlob,
  baseStyle,
  focusedStyle,
  acceptStyle,
  rejectStyle,
} from "../../helper/dropMp3";
import noalbum from "../../assets/img/no-album-art.png";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { CardMedia, MenuItem, Button } from "@mui/material";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { URL as urlbase } from "../../helper/Url";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { uploadDataMusic } from "../../features/music";
import axios from "axios";
import { useTranslation } from "react-i18next";

export const UploadMusic = ({ handleClose }) => {
  const [finalData, setfinalData] = useState([]);
  const [files, setFiles] = useState([]);
  const [genero, setGenero] = useState("");
  const [title, settitle] = useState("");
  const [artist, setartist] = useState("");
  const [imageUrl, setimageUrl] = useState(noalbum);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const handleChange = (event) => {
    setGenero(event.target.value);
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: "audio/mp3, audio/wav, .mp3, .wav",
      maxFiles: 1,
      maxSize: 26214400,
      onDropAccepted: (acceptedFiles) => {
        var newdata = acceptedFiles;
        for (let i = 0; i <= newdata.length - 1; i++) {
          newdata = newdata[i];
          setfinalData(newdata);
        }
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });
  useEffect(() => {
    if (files.length > 0) {
      readMetatags(files[0]).then((tag) => {
        if (tag.picture) {
          const imageParsed = readImage(tag.picture);
          setimageUrl(imageParsed);
        } else {
          setimageUrl(noalbum);
        }
        if (tag.title) settitle(tag.title);
        if (tag.artist) setartist(tag.artist);
        if (tag.genre) {
          const genexist = genres.find(
            (element) => element.value === tag.genre
          );
          if (genexist) {
            const { value } = genexist;
            setGenero(value);
          }
        }
      });
    }
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleClick = async () => {
    // Create an FormData object
    var imagentoFile = DataURIToBlob(imageUrl);
    var mineData = new FormData();
    mineData.append("file", finalData, "file.mp3");
    mineData.append("file", imagentoFile, "image.png");
    mineData.append("title", title);
    mineData.append("artist", artist);
    mineData.append("genre", genero);
    dispatch(uploadDataMusic(mineData));
    handleClose();
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {files.length === 0 && (
        <>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>{t("musics.dragAndDrop")}</p>
          </div>
        </>
      )}
      {files.length > 0 && (
        <>
          <CardMedia
            component="img"
            sx={{
              width: 350,
              height: 350,
            }}
            image={imageUrl}
            alt="album cover"
          />

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "500px" },
              display: "flex",
              flexDirection: "column",
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="filled-basic"
              label="title"
              variant="filled"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <TextField
              id="filled-basic"
              label="Artist"
              variant="filled"
              value={artist}
              onChange={(e) => setartist(e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={genero}
              onChange={handleChange}
              helperText="Please select your genre"
            >
              {genres.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <div>
              <Button
                variant="contained"
                onClick={handleClick}
                component="span"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                endIcon={<AudioFileIcon />}
                disabled={title && artist && genero ? false : true}
              >
                {t("musics.upload")}
              </Button>
            </div>
            <div></div>
            <div></div>
          </Box>
        </>
      )}
    </div>
  );
};
