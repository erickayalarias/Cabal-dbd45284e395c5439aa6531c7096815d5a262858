import React from 'react';
import styled from 'styled-components';
import ControlledAccordions from './Musics/MusicList2';
import { PlayBarRoot } from './Musics/Reproducer/ReproducerHomeSmall';

const NavRigth = () => {
  return (
      <NavLateral>
        <ControlledAccordions />
        <PlayBarRoot />
      </NavLateral>
  );
};

const NavLateral = styled.div`
  background-color: #000000;
  height: 100%;
  border-left: 2px rgb(204, 102, 255) solid;
  width: 300px;
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0px 0px 100px rgb(204, 153, 255, 0.4);
  @media only screen and (max-width: 1500px) {
    display: none;
    visiblity: hidden;
  }
`;

export default NavRigth;
