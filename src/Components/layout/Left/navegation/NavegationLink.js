import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./Navegation.css";
import { useTranslation } from "react-i18next";

export const NavegationLink = ({ img, Nav, notification, handleClick }) => {
  const { t } = useTranslation();
  return (
    <LinkContainer>
      <Link className="noUndeline" to={`/${Nav}`} onClick={handleClick}>
        <Image1 src={img} />
        <Text1>{t(`nav.${Nav.toLowerCase()}`)}</Text1>
        {notification > 0 ? (
          <Ellipse>
            <Text2>{notification}</Text2>
          </Ellipse>
        ) : (
          <Espaciador />
        )}
      </Link>
    </LinkContainer>
  );
};

const LinkContainer = styled.div`
  width: auto;
  margin-top: 30px;
  margin-bottom: 20px;
  border-radius: 10px;
  &:hover {
    background-color: #cc99ff;
  }
  @media only screen and (max-width: 1050px) {
    width: 150px;
  }
`;

const Image1 = styled.img`
  width: 30.8px;
  height: 26.3px;
  align-self: flex-end;
  margin: 0px 21.2px 2.4px 8px;
`;
const Text1 = styled.div`
  width: 146px;
  height: 25.1px;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 400;
  color: #98989a;
  margin: 0px 27px 0px 0px;
  &:hover {
    color: #ffffff;
  }
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
const Ellipse = styled.div`
  width: 34px;
  height: 23.7px;
  background-image: url("https://file.rendit.io/n/h5P38F8uH7wdhcV98blR.svg");
  background-size: cover;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 0px 4px 0px;
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
const Text2 = styled.div`
  width: 12px;
  height: 23.7px;
  display: flex;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 900;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const Espaciador = styled.div`
  width: 34px;
  height: 23.7px;
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
