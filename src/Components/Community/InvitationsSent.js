import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardFriend } from "./CardFriend";
import styled from "styled-components";
import { useEffect } from "react";
import { cancelinvite, getpendingfriend } from "../../features/friends";
import { useTranslation } from "react-i18next";

export default function InvitationsSent() {
  const user = useSelector((state) => state.session);
  const pendingfriends = useSelector((state) => state.friends);
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

  const cancelInvite = (inviteID) => {
    dispatch(
      cancelinvite({
        uid: user.uid,
        publicKey: user.publicKey,
        inviteId: inviteID,
      })
    );
  };

  return userInvites.length > 0 ? (
    userInvites.map((friends) => {
      if (user.publicKey === friends.userSender.publicKey) {
        return (
          <CardFriend
            pending={false}
            userData={friends.userRecipient}
            message={friends.mensage}
            redButton={t("communities.cancelInvitation")}
            key={friends._id}
            cardFunction={cancelInvite}
            typeData={friends._id}
          />
        );
      }
    })
  ) : (
    <DivMessage> {t("communities.emptylistSendInvites")} </DivMessage>
  );
}

const DivMessage = styled.div`
  height: 158px;
  color: #9d4edd;
  font-size: 3em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.1em auto;
  width: 50%;
  align-items: center;
  padding: 0px 2px;
  font-weight: 800;
  @media only screen and (max-width: 1500px) {
    width: 80%;
    min-width: 700px;
  }
`;
