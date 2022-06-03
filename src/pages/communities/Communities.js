import React from "react";
import { PrivateRoot } from "../../HOC/PrivateRoot";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CreateCommunity } from "../../Components/Community/CreateCommunity";
import CommunityList from "../../Components/Community/CommunityList";
import CommunitiesInvites from "../../Components/Community/CommunitiesInvites";
import CustomModal from "../../Components/utils/Modal/CustomModal";
import { Button, IconButton } from "@mui/material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";
import EmailIcon from "@mui/icons-material/Email";
import AddBoxIcon from "@mui/icons-material/AddBox";

const useStyles = makeStyles(() => ({
  root: {
    color: "white",
    "&$selected": {
      color: "#cc33ff",
    },
  },
  selected: {},
}));

const useColorButton = makeStyles(() => ({
  root: {
    color: "white",
    "&:active": {
      color: "#cc33ff",
    },
  },
  selected: {},
}));

export default function Communities() {
  const classes = useStyles();
  const colorButton = useColorButton();
  const { t } = useTranslation();
  const [selectOption, setSelectOption] = useState("communities");
  const [modal, setModal] = useState(false);
  const handleChange = (event, newValue) => {
    setSelectOption(newValue);
  };

  return (
    <PrivateRoot>
      <div>
        <FriendsRoots>
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
              label={t("communities.nav")}
              value="communities"
              icon={<GroupsIcon />}
            />
            <BottomNavigationAction
              classes={classes}
              label={t("communities.navInvites")}
              value="invites"
              icon={<EmailIcon />}
            />

            <IconButton
              sx={{ marginLeft: 5, marginRight: 3 }}
              onClick={() => setModal(!modal)}
            >
              <AddBoxIcon classes={colorButton} fontSize="large" />
            </IconButton>
          </BottomNavigation>
        </FriendsRoots>
        <CustomModal open={modal} handleClose={() => setModal(false)}>
          <CreateCommunity handleClose={() => setModal(false)} />
        </CustomModal>
        {selectOption === "communities" && <CommunityList />}
        {selectOption === "invites" && <CommunitiesInvites />}
      </div>
    </PrivateRoot>
  );
}

const FriendsRoots = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  width: 200px;
  border-radius: 30px;
  padding: 13px;
  @media only screen and (max-width: 1800px) {
    width: 300px;
  }
`;

const Navfriend = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: justify;
  gap: 20px;
  cursor: pointer;
`;
