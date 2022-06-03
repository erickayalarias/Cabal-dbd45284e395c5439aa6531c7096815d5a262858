import { useAddress } from '@thirdweb-dev/react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  check,
  getUserInfo,
  setPasdb,
  setPass,
  setPublicKey,
} from '../../features/session';

import { SHA256, AES, enc } from 'crypto-js';
import Spinner from '../../Components/utils/Spiner/Spiner';
import { getMusic, mostLikedMusic } from '../../features/music';
import { getUserChats, getUsersChats } from '../../features/chat';
import { getallfriends, getpendingfriend } from '../../features/friends';
import { getPlayList } from '../../features/playList';
export const Authentification = () => {
  const dispatch = useDispatch();
  const address = useAddress();
  const navigate = useNavigate();
  //States
  const data = useSelector((state) => state.session);
  const userChat = useSelector((state) => state.chat.user);

  const checkLoginAccount = async () => {
    dispatch(check(address));
    dispatch(getUsersChats(address));
    if (data.stateDispach) {
      if (data.user !== '') {
        //TODO cojemos informacion de usuario
        dispatch(getUserInfo({ uid: data.uid, publicKey: data.uid }));
     
        //TODO el usuario existe
        const privateKey = localStorage.getItem('cabal_privateKey');
        const passwordencrypt =
          localStorage.getItem('cabal_password');
        if (privateKey && passwordencrypt) {
          //TODO hay algo en localstorage
          var passdescryptDb = AES.decrypt(
            data.pass,
            privateKey
          ).toString(enc.Utf8);
          var passdescrypt = AES.decrypt(
            passwordencrypt,
            privateKey
          ).toString(enc.Utf8);
          if (passdescryptDb === passdescrypt) {
            dispatch(setPass(privateKey));
            dispatch(getMusic(data.uid));
            // erick dispatch mostLikedMusic() and getPlayList(data.uid)
            dispatch(getPlayList(data.uid));
            dispatch(mostLikedMusic());
            dispatch(getUserChats(userChat._id));
            dispatch(getpendingfriend({ uid: data.uid, publicKey: data.uid }));
            dispatch(getallfriends({ uid: data.uid, publicKey: data.uid }));
            navigate('/news');
          } else {
            //TODO local storage no existe pero el usuario si existe, asi que ha borrado su localStorage por x motivo
            dispatch(setPasdb('local-NotExist'));
            navigate('/registration');
          }
        } else {
          //TODO local storage no existe pero el usuario si existe, asi que ha borrado su localStorage por x motivo
          dispatch(setPasdb('local-NotExist'));
          navigate('/registration');
        }
      } else {
        //TODO el usuario no existe y no tiene cuenta
        dispatch(setPublicKey(address));
        navigate('/registration');
      }
    }
  };

  useEffect(() => {
    if (address) {
      checkLoginAccount();
    } else {
      navigate('/');
    }
  }, [address, data]);



  return (
    <StyledAuthentification>
      <Spinner />
    </StyledAuthentification>
  );
};

const StyledAuthentification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
