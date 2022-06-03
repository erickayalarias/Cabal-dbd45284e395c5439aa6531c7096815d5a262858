import React from "react";
import { Navegacion1 } from "./navegation/NavigationBar";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Perfil1 } from "./user/Perfil";
import { useNavigate } from "react-router-dom";
import { useDisconnect } from "@thirdweb-dev/react";
const NavLeft = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const disconnectAddress = useDisconnect();
  const handleClick = () => {
    disconnectAddress();
    navigate("/");
  };

  const [t, i18n] = useTranslation();
  const storeLanguages = i18n.store.data;
  const optionsLangs = [];

  const handleChangeSetLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  for (const iterator in storeLanguages) {
    optionsLangs.push(<ItemLanguage value={iterator}>{iterator}</ItemLanguage>);
  }

  return (
    <NavLateral>
      <Perfil1 setOpenModal={setOpenModal} />
      <Navegacion1 />
      <IconButton
        onClick={() => {
          handleClick();
        }}
      sx={{
        color: '#9738a7',
        right: '-1em',
        ['@media (max-width: 1050px)']: {
          right: '0em',
        },
        ['@media (min-width: 1790px)']: {
          right: '-2em',
        }
      }}>
        <MeetingRoomIcon 
        fontSize='large' />
      </IconButton>
      {/* <MenuLanguage
        onChange={handleChangeSetLanguage}
        defaultValue={navigator.language.substring(0, 2)}
      >
        {optionsLangs.map((option) => option)}
      </MenuLanguage> */}
    </NavLateral>
  );
};

const NavLateral = styled.div`
  background-color: #000000;
  border-right: 2px rgb(204, 102, 255) solid;
  width: 350px;
  height: 100%;
  position: fixed;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-shadow: 0px 0px 100px rgb(204, 153, 255, 0.4);
  @media only screen and (max-width: 1800px) {
    width: 300px;
  }
  @media only screen and (max-width: 1050px) {
    width: 50px;
  }
`;

const MenuLanguage = styled.select`
  background-color: rgb(204, 102, 255);
  color: white;
  font-size: 12px;
  cursor: pointer;
  margin- @media only screen and (min-width: 400px) {
    width: 50px;
    font-size: 14px;
  }
  @media only screen and (min-width: 1050px) {
    width: 80px;
    font-size: 25px;
    margin-left: 2rem;
  }
`;

const ItemLanguage = styled.option`
  cursor: crosshair;
`;

export default NavLeft;
