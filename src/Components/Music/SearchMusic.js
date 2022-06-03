import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styled from "styled-components";
import { getMusicSearch } from "../../features/music";

export const SearchMusic = () => {
    const [searchMusicName, setSearchMusicName] = useState("");
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { uid } = useSelector((state) => state.session);

    const handleSearchMusic = (e) => {
        setSearchMusicName(e.target.value);
        const searchMusicNameCapitalized =
            e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        const searchMusic = {
            uid: uid,
            name: searchMusicNameCapitalized,
        };

        dispatch(getMusicSearch(searchMusic));
    };

    return (
        <MusicRoot>
            <TextField
                size="small"
                variant="outlined"
                onChange={handleSearchMusic}
                value={searchMusicName}
                placeholder={t("searchMusic")}
                style={styleTextSearch}
                InputProps={{
                    startAdornment: (
                        <InputAdornment
                            position="start"
                            style={styleInputSearch}
                        >
                            <SearchIcon style={styleIconSearch} />
                        </InputAdornment>
                    ),
                }}
            />
        </MusicRoot>
    );
};

const MusicRoot = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 15px auto;
    width: 918px;
    align-items: flex-start;
    border-radius: 30px;
    padding: 13px;
    @media only screen and (max-width: 1800px) {
        width: 600px;
    }
`;

const styleTextSearch = {
    backgroundColor: "#9D4EDD",
    color: "white",
    width: "80%",
    margin: "auto",
    borderRadius: "5px",
};

const styleInputSearch = {};

const styleIconSearch = {
    color: "white",
};
