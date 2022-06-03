import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { NavegationLink } from "./NavegationLink";
import socket from "../../../../helper/socket";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../../../../features/session";
import { getUserChats } from "../../../../features/chat";

export const Navegacion1 = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friends.friendsArray);
  const user = useSelector((state) => state.session);
  const data = {
    uid: user.uid,
    publicKey: user.publicKey,
    data: {
      images: [
        user.notificaciones[0],
        user.notificaciones[1],
        user.notificaciones[2],
      ],
    },
  };
  useEffect(() => {
    socket.on("notificacionesChat", (arg) => {
   
      dispatch(getUserInfo({ uid: user.uid, publicKey: user.publicKey }));
    });
    
    // socket.on('notificacionesPost', (arg) => {
    //   console.log('sockets post', arg.publicKey);
    // });
    // socket.on('notificacionesFriends', (arg) => {
    //   console.log('sockets friends', arg);
    //   dispatch(updateUserInfo(data));
    // });
  }, []);
  return (
    <NavegacionRoot>
      <NavegationLink
        img="https://file.rendit.io/n/5RAyQvnAqdGmZrqBC8Di.svg"
        Nav="News"
        notification={user.notificaciones[1]}
      />
      <NavegationLink
        img="https://file.rendit.io/n/dfilj5wBCfmLR0qsWZe6.svg"
        Nav="Chats"
        notification={user.notificaciones[0]}
        handleClick={() => {
          data.data.images[0] = 0;
          console.log("entrar chat");
          dispatch(updateUserInfo(data));
        }}
      />
      <NavegationLink
        img="https://file.rendit.io/n/dYCc0BGt8yro50sGgcz6.svg"
        Nav="friends"
        notification={user.notificaciones[2]}
        handleClick={() => {
          data.data.images[2] = 0;

          dispatch(updateUserInfo(data));
        }}
      />
      <NavegationLink
        img="https://file.rendit.io/n/4lnQ8PzhdM1aobwlMxSp.svg"
        Nav="community"
        notification="0"
      />
      <NavegationLink
        img="https://file.rendit.io/n/dVGGoDFvxTpwJhWKoPoj.svg"
        Nav="Music"
        notification="0"
      />
    </NavegacionRoot>
  );
};
const NavegacionRoot = styled.div`
  width: 262px;
  ${"" /* height: 488px; */}
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 10px auto;
  align-items: flex-end;
  @media only screen and (max-width: 1050px) {
    padding-top: 30px;
    width: 50px;
  }
`;
const Linia = styled.div`
  width: 220px;
  height: 1.84px;
  background-color: #787878;
  align-self: flex-start;
  margin: ${(props) => props.margin};
  @media only screen and (max-width: 1050px) {
    width: 50px;
  }
`;
