import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setTrack, setTrackImg, setTitle, setPlaylist } from "../../../../features/audioDisplay";

export const MusicCard = ({ img, title, descript , file, index , liked}) => {
  const dispatch = useDispatch();
  const { playList } = useSelector((state) => state.playList);
  const { mostLiked } = useSelector((state) => state.musics);
  
  const handleClick = () => {
    if (liked) {
      dispatch(setPlaylist(mostLiked))
      dispatch(setTrack(index));
      dispatch(setTrackImg(img));
      dispatch(setTitle(title));
      return
    }
    dispatch(setPlaylist(playList[0].musics));
    dispatch(setTrack(index));
    dispatch(setTrackImg(img));
    dispatch(setTitle(title));
  }
  return (
    <NowPlayingRoot
      onClick={handleClick}
    >
      <AlbumArt src={img} />
      <InfoMusic>
        <BlackFlexColumn>
          <LabelDefault>{title}</LabelDefault>
        </BlackFlexColumn>
        <Text1>{descript}</Text1>
      </InfoMusic>
    </NowPlayingRoot>
  );
};
const NowPlayingRoot = styled.div`
  width: 248px;
  display: flex;
  flex-direction: row;
  gap: 9.6px;
  justify-content: center;
  margin: 5px 0px;
  align-items: center;
`;
const AlbumArt = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  &:hover {
    width: 61px;
    height: 61px;
  }
`;
const InfoMusic = styled.div`
  width: 176px;
  height: 51px;
  align-self: flex-end;
  position: relative;
  margin: 0px 0px 5.1px 0px;
`;
const BlackFlexColumn = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LabelDefault = styled.div`
  width: 132px;
  height: 25.3px;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
`;
const Text1 = styled.div`
  width: 172px;
  height: 25.5px;
  font-size: 14px;
  font-family: Hind;
  font-weight: 400;
  color: #868686;
  position: relative;
  top: 35px;
  left: 4px;
`;
