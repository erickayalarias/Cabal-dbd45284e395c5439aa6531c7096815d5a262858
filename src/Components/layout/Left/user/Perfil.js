import { useDisconnect } from "@thirdweb-dev/react";
import React, { useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../../../../features/session";
import { AvatarModal } from "../../../FormsUI/Avatar";
import { useTranslation } from "react-i18next";

export const Perfil1 = ({ setOpenModal, openModal }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.session);
  const posts = useSelector((state) => state.posts);
  const friends = useSelector((state) => state.friends);
  useEffect(() => {

    dispatch(getUserInfo({ uid: user.uid, publicKey: user.publicKey }));
  }, [ user.avatar, friends.friendsArray]);
  return (
    <PerfilRoot>
      <FlexRow>
        <ImagenPerfil
          src={user.avatar}
          onClick={() => {
            setOpenModal(true);
          }}
        />
        <Element3>
          <Name1>{user.user}</Name1>
        </Element3>
      </FlexRow>
      <FlexRow1>
        <Posts1>
          <Text1>{user.posts}</Text1>
          <Text2>{t("profile.posts")}</Text2>
        </Posts1>
        <Posts1>
          <Text1>{user.friends.length}</Text1>
          <Text2>{t("profile.friends")}</Text2>
        </Posts1>
      </FlexRow1>
      <Line src={"https://file.rendit.io/n/ePDdKPGnwYbX44vuDEl3.svg"} />
    </PerfilRoot>
  );
};

const PerfilRoot = styled.div`
  width: 300px;
  height: 195px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px auto;
  padding: 30px 10px;
  @media only screen and (max-height: 800px) {
    height: 90px;
  }
  @media only screen and (max-width: 1050px) {
    display: none;
  }
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 21px;
  align-items: center;
  margin: 0px 0px 34px 0px;
`;
const ImagenPerfil = styled.img`
  width: 80px;
  height: 80px;
  background-color: #bbd4e5;
  border-radius: 1000px;
`;
const Element3 = styled.div`
  width: 193px;
  height: 100px;
  position: relative;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Name1 = styled.div`
  width: 100%;
  height: 32px;
  padding: 10px 20px 10px 0px;
  font-size: 150%;
  font-family: Roboto;
  font-weight: 400;
  color: #ffffff;
`;
const More = styled.img`
  width: 16.1px;
  height: 8px;
`;
const FlexRow1 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  align-items: center;
  padding: 0px 44px 0px 52px;
  margin: 0px 0px 13.72px 0px;
  @media only screen and (max-height: 800px) {
    display: none;
  }
`;
const Posts1 = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;
const Text1 = styled.div`
  width: 26px;
  height: 24px;
  font-size: 24px;
  font-family: Salsa;
  font-weight: 400;
  color: #ffffff;
  align-self: flex-start;
  margin: 0px 0px 0px 15px;
`;

const Line = styled.img`
  width: 320px;
  height: 0.28px;
  align-self: flex-start;
`;
const Text2 = styled.div`
  width: 106px;
  height: 18px;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 700;
  color: #787878;
`;
