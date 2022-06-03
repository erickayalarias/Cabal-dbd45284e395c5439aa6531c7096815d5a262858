import { useState } from "react";
import { useTranslation } from "react-i18next";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "styled-components";

export const SearchPlayList = () => {
    const [SearchPlayListName, setSearchPlayListName] = useState("");
    const { t } = useTranslation();

    const handleSearchPlayList = (e) => setSearchPlayListName(e.target.value);

    return (
        <PlayListRoot>
            <TextField
                size="small"
                variant="outlined"
                onChange={handleSearchPlayList}
                value={SearchPlayListName}
                placeholder={t("searchPlayList")}
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
        </PlayListRoot>
    );
};

const PlayListRoot = styled.div`
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
