import React, { useState } from 'react';
import styled from 'styled-components';
import NavRigth from './Rigth/NavRigth';
import NavLeft from './Left/NavLeft';
import { PlayBar1 } from '../../Components/layout/Rigth/Musics/Reproducer/ReproducerHomeSmall';
import { Outlet } from 'react-router-dom';
import { AvatarModal } from '../FormsUI/Avatar';

const Layout = (props) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Cont>
      <NavLeft setOpenModal={setOpenModal} openModal={openModal} />
      <Body>
        <AvatarModal
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <Outlet />
      </Body>
      <NavRigth />
      <PlayBar1 layoutType={'horizontal-reverse'} />
    </Cont>
  );
};
const Cont = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: auto;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px 300px 100px 300px;
  align-items: center;
  width: 100%;
  overflow-y: auto;
  @media only screen and (max-width: 1500px) {
    margin: 0px 0px 100px 300px;
  }
  @media only screen and (max-width: 1050px) {
    margin: 0px 0px 100px 50px;
  }
`;
export default Layout;
