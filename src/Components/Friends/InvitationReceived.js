import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardFriend } from "./CardFriend";
import styled from "styled-components";
import {
  addfriend,
  cancelinvite,
  getpendingfriend,
} from "../../features/friends";
import { useEffect } from "react";
import { creaChat, getUserFilter, setCreateChat } from "../../features/chat";
import { useTranslation } from "react-i18next";
export default function InvitationReceived() {
  const user = useSelector((state) => state.session);
  const pendingfriends = useSelector((state) => state.friends);
  const usersChats = useSelector((state) => state.chat.createChat);
  const dispatch = useDispatch();
  const userInvites = pendingfriends.inviteFriends.userInvite;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getpendingfriend({
        uid: user.uid,
        publicKey: user.publicKey,
      })
    );
  }, []);

  useEffect(() => {
  
    if (!usersChats) return;
    if (usersChats.length === 2) {
      dispatch(creaChat([usersChats[0]._id, usersChats[1]._id]));
      dispatch(setCreateChat());
    }
  }, [usersChats]);

  const acceptInvite = async (data) => {
    dispatch(getUserFilter(user.publicKey));
    dispatch(getUserFilter(data.friendPublicKey));
    dispatch(
      addfriend({
        uid: user.uid,
        publicKey: user.publicKey,
        friendPublicKey: data.friendPublicKey,
        password: data.password,
      })
    );

    dispatch(
      addfriend({
        uid: data.friendPublicKey,
        publicKey: data.friendPublicKey,
        friendPublicKey: user.publicKey,
        password: user.privateKey,
      })
    );

    dispatch(
      cancelinvite({
        uid: user.uid,
        publicKey: user.publicKey,
        inviteId: data.inviteId,
      })
    );
  };

  const deniedInvite = (data) => {
    dispatch(
      cancelinvite({
        uid: user.uid,
        publicKey: user.publicKey,
        inviteId: data.inviteId,
      })
    );
  };

  return userInvites.length > 0 ? (
    userInvites.map((friends) => {

       if (user.publicKey !== friends.userSender.publicKey) {
        return (
          <CardFriend
            pending={true}
            userData={friends.userSender}
            redButton={t("friends.denied")}
            message={friends.mensage}
            key={friends._id}
            cardFunction={deniedInvite}
            cardFunctionAccept={acceptInvite}
            typeData={{
              friendPublicKey: friends.userSender.publicKey,
              password: friends.password,
              inviteId: friends._id,
            }}
          />
        );
      }
      return null;
    })
  ) : (
    <DivMessage> {t("friends.emptylistReceiveFriends")}</DivMessage>
  );
}

const DivMessage = styled.div`
  height: 158px;
  color: #9d4edd;
  font-size: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.1em auto;
  width: 100%;
  align-items: center;
  padding: 0px 2px;
  font-weight: 800;
  @media only screen and (max-width: 1500px) {
    width: 80%;
    min-width: 700px;
  }
`;
