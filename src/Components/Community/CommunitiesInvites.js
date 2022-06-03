import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { useEffect } from "react";
import { CommunityCard } from "./CommunityCard";
import {
  cancelcommunitiesinvite,
  getcommunitiesinvite,
  joincommunities,
} from "../../features/communities";
import { CheckCommunityInvite } from "../../features/communities/CommunityAPI";
import { useTranslation } from "react-i18next";

export default function CommunitiesInvites() {
  const user = useSelector((state) => state.session);
  const myCommunities = useSelector(
    (state) => state.communities.communitiesInvite
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getcommunitiesinvite({
        uid: user.uid,
        publicKey: user.publicKey,
      })
    );
  }, []);

  const acceptInvite = async (data) => {
    const res = await CheckCommunityInvite({
      uid: user.uid,
      userPublicKey: user.publicKey,
      communityId: data._id,
    });

    dispatch(
      joincommunities({
        uid: user.uid,
        publicKey: user.publicKey,
        communityId: data._id,
      })
    );

    dispatch(
      cancelcommunitiesinvite({
        uid: user.uid,
        publicKey: user.publicKey,
        inviteId: res.data.data,
      })
    );
  };
  const deniedInvite = async (data) => {
    const res = await CheckCommunityInvite({
      uid: user.uid,
      userPublicKey: user.publicKey,
      communityId: data._id,
    });

    dispatch(
      cancelcommunitiesinvite({
        uid: user.uid,
        publicKey: user.publicKey,
        inviteId: res.data.data,
      })
    );
  };

  return myCommunities && myCommunities.length > 0 ? (
    myCommunities.map((community) => {
      return (
        <CommunityCard
          commData={community}
          key={community._id}
          redButton="Denied"
          greenButton="Accept"
          cardFunction={deniedInvite}
          cardFunctionAccept={acceptInvite}
          message={community.description}
          typeData={community}
        />
      );
    })
  ) : (
    <DivMessage> {t("communities.emptylistInvites")} </DivMessage>
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
