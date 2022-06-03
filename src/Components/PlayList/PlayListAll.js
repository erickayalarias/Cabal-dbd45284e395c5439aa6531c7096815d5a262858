
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../Music/music.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import {
  getPlayList,
  setEditedPlayList,
} from '../../features/playList';

import { CardPlayList } from './CardPlayList';
import CustomModal from '../utils/Modal/CustomModal';
import { CreatePlaylist } from './CreatePlaylist';
import { IconButton } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { makeStyles } from '@mui/styles';

const useColorButton = makeStyles(() => ({
  root: {
    color: 'white',
    '&:active': {
      color: '#cc33ff',
    },
  },
  selected: {},
}));

export const PlayListAll = () => {
  const colorButton = useColorButton();
  const { publicKey } = useSelector((state) => state.session);
  const { playList } = useSelector((state) => state.playList);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [playlistall, setplaylistall] = useState(playList);
  const handleShowModal = () => {
    setModal(!modal);
    dispatch(setEditedPlayList({ title: '', musics: [] }));
  };
  useEffect(() => {
    setplaylistall(playList);
  }, [playList]);

  useEffect(() => {
    dispatch(getPlayList(publicKey));
  }, []);

  const handleOnSearch = (string) => {
    if (string === '') {
      setplaylistall(playList);
    }
    if (string !== '') {
      const newPlayList = playList.filter((playlist) =>
        playlist.title.toLowerCase().includes(string)
      );
      if (newPlayList.length > 0) {
        setplaylistall(newPlayList);
      } else {
        setplaylistall(playList);
      }
    }
  };

  useEffect(() => {
    dispatch(getPlayList(publicKey));
  }, []);

  const handleCloseModal = () => {
    setModal(false);
  };
  return (
    <div
      style={{
        marginBottom: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '95%',
          alignContent: 'center',
          justifyContent: 'center',
        }}
        className="search-bar"
      >
        <ReactSearchAutocomplete onSearch={handleOnSearch} />
      </div>

      <IconButton
        sx={{ marginTop: '30px', marginBottom: '30px' }}
        onClick={handleShowModal}
      >
        <PlaylistAddIcon classes={colorButton} fontSize="large" />
      </IconButton>
      <CustomModal open={modal} handleClose={handleShowModal}>
        <CreatePlaylist handleCloseModal={handleCloseModal} />
      </CustomModal>
      {playlistall.map(
        ({ _id, title, author, musics, likes, image }) => (
          <CardPlayList
            key={_id}
            _id={_id}
            title={title}
            musics={musics}
            author={author}
            likes={likes}
            image={image}
          />
        )
      )}
    </div>
  );
};
