import React from "react";
import { PrivateRoot } from "../../HOC/PrivateRoot";
import styled from "styled-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import InvitationsSent from "../../Components/Friends/InvitationsSent";
import InvitationReceived from "../../Components/Friends/InvitationReceived";
import FriendsList from "../../Components/Friends/FriendsList";
import { AddFriendsForm } from "../../Components/Friends/AddFriendsForm";
import OutboxIcon from "@mui/icons-material/Outbox";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from "@mui/icons-material/Group";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    color: "white",
    "&$selected": {
      color: "#cc33ff",
    },
  },
  selected: {},
}));

export default function Friends() {
  const classes = useStyles();
  const [selectOption, setSelectOption] = useState("Recieved");
  const { t } = useTranslation();

  const handleChange = (event, newValue) => {
    setSelectOption(newValue);
  };

  return (
    <PrivateRoot>
      {/* <AddFriend /> */}
      <AddFriendsForm />
      <div>
        <FriendsRoots>
          <BottomNavigation
            sx={{
              width: 500,
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
              label={t("friends.navSend")}
              value="Send"
              icon={<OutboxIcon />}
            />
            <BottomNavigationAction
              classes={classes}
              label={t("friends.navRecieved")}
              value="Recieved"
              icon={<MoveToInboxIcon />}
            />
            <BottomNavigationAction
              classes={classes}
              label={t("friends.navFriends")}
              value="Friends"
              icon={<GroupIcon />}
            />
          </BottomNavigation>
        </FriendsRoots>
        {selectOption === "Recieved" && <InvitationReceived />}
        {selectOption === "Send" && <InvitationsSent />}
        {selectOption === "Friends" && <FriendsList />}
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
