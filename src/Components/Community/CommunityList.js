import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import styled from "styled-components";
import {
  getComunity,
  getusercommunities,
  leavecommunities,
} from "../../features/communities";
import { CommunityCard } from "./CommunityCard";
import { useTranslation } from "react-i18next";

//Return all your and your friends' communities and show
export default function CommunityList() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.session);
  const myCommunities = useSelector((state) => state.communities.mycommunities);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getusercommunities({
        uid: user.uid,
        publicKey: user.publicKey,
      })
    );
  }, [posts]);

  //TODO Exit on the community
  const leaveCommunity = (data) => {
    const dispatchData = {
      uid: user.uid,
      publicKey: user.publicKey,
      communityId: data,
    };
    dispatch(leavecommunities(dispatchData));
  };

  const enterCommunity = (data) => {
    const dispatchData = {
      uid: user.uid,
      publicKey: user.publicKey,
      id: data._id,
    };
    const comunity = myCommunities.filter(
      (community) => community._id === data._id
    );
    dispatch(getComunity(comunity));
    navigate(`/community/${data._id}`);
  };

  return (
    <>
      {myCommunities ? (
        myCommunities.map((community) => {
          return (
            <CommunityCard
              commData={community}
              redButton={t("communities.leave")}
              greenButton={t("communities.access")}
              key={community._id}
              cardFunction={leaveCommunity}
              typeData={community._id}
              cardFunctionAccept={enterCommunity}
              message={community.description}
            />
          );
        })
      ) : (
        <DivMessage> {t("communities.emptylistCommunities")} </DivMessage>
      )}
    </>
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
