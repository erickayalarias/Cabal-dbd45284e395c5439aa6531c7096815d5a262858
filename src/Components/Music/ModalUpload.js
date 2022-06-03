import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { UploadMusic } from './UploadMusic';
import PublishIcon from '@mui/icons-material/Publish';
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import imagebackground from '../.././assets/img/triangles.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '900px',
  height: '380px',
  backgroundImage: `url(${imagebackground})`,
  backgroundSize: 'cover',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

const useColorButton = makeStyles(() => ({
  root: {
    color: 'white',
    '&:active': {
      color: '#cc33ff',
    },
  },
  selected: {},
}));

export const ModalUpload = () => {
  const colorButton = useColorButton();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <IconButton
        sx={{ marginLeft: 5, marginRight: 3 }}
        onClick={handleOpen}
      >
        <PublishIcon classes={colorButton} fontSize="large" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UploadMusic handleClose={handleClose} />
        </Box>
      </Modal>
    </Box>
  );
};
