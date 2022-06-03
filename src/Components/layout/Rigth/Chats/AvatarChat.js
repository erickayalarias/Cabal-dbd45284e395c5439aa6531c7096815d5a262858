import React from "react";
import styled from "styled-components";
export const AvatarChat = ({img,status,Alias}) => {
  return (
    <FriendsChatsRoot>
      <AlbumArt src={img} />
      <Element1>
        <Text1>{status}</Text1>
        <Text2>{Alias}</Text2>
      </Element1>
    </FriendsChatsRoot>
  );
};
const FriendsChatsRoot = styled.div`
  width: 323px;
  display: flex;
  flex-direction: row;
  gap: 21.4px;
  justify-content: center;
  margin: auto;
  align-items: flex-start;
`;
const AlbumArt = styled.img`
  width: 53.6px;
  height: 57.1px;
`;
const Element1 = styled.div`
  align-self: stretch;
  width: 248px;
  height: 70px;
  position: relative;
  flex-grow: 1;
`;
const Text1 = styled.div`
  width: 244px;
  height: 32px;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  color: #787878;
  position: absolute;
  top: 38px;
  left: 2px;
`;
const Text2 = styled.div`
  width: 248px;
  height: 48px;
  font-size: 24px;
  font-family: Roboto;
  font-weight: 400;
  color: #ffffff;
  position: absolute;
  top: 3px;
`;
