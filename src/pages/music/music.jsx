import { Box } from '@mui/material';
import { MenuMainMusics } from '../../Components/Music/MenuMainMusics';
import { PrivateRoot } from '../../HOC/PrivateRoot';



const MusicView = () => {
  return (
    <PrivateRoot>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      ></Box>
      <MenuMainMusics />
    </PrivateRoot>
  );
};

export default MusicView;
