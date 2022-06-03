import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../../../features/session';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 500,
  bgcolor: 'purple',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: 'white',
};

export const AvatarModal = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [eyes, setEyes] = React.useState('happy');
  const [hair, setHair] = React.useState('long');
  const [body, setBody] = React.useState('squared');
  const [mouth, setMouth] = React.useState('smile');
  const [nose, setNose] = React.useState('mediumRound');
  const [facialHair, setFacialHair] = React.useState('pyramid');
  const [hairColor, setHairColor] = React.useState('black');
  const [clothingColor, setClothingColor] = React.useState('blue');
  const [skinColor, setSkinColor] = React.useState('tone1');
  const [avatar, setAvatar] = React.useState(
    `https://avatars.dicebear.com/api/personas/${user.user}.svg?translateY=-10&eyes[]=${eyes}&hair[]=${hair}&body[]=${body}&mouth[]=${mouth}&nose[]=${nose}&facialHair[]=${facialHair}&hairColor[]=${hairColor}&clothingColor[]=${clothingColor}&skinColor[]=${skinColor}`
  );

  const data = {
    uid: user.uid,
    publicKey: user.publicKey,
    data: {
      avatar: `https://avatars.dicebear.com/api/personas/${user.user}.svg?eyes[]=${eyes}&hair[]=${hair}&body[]=${body}&mouth[]=${mouth}&nose[]=${nose}&facialHair[]=${facialHair}&hairColor[]=${hairColor}&clothingColor[]=${clothingColor}&skinColor[]=${skinColor}`,
    },
  };

  const handleChangeEyes = (event) => {
    setEyes(event.target.value);
  };
  const handleChangeHair = (event) => {
    setHair(event.target.value);
  };
  const handleChangeBody = (event) => {
    setBody(event.target.value);
  };
  const handleChangeMouth = (event) => {
    setMouth(event.target.value);
  };
  const handleChangeNose = (event) => {
    setNose(event.target.value);
  };
  const handleChangeFacialHair = (event) => {
    setFacialHair(event.target.value);
  };
  const handleChangeHairColor = (event) => {
    setHairColor(event.target.value);
  };
  const handleChangeClothingColor = (event) => {
    setClothingColor(event.target.value);
  };
  const handleChangeSkinColor = (event) => {
    setSkinColor(event.target.value);
  };

  const handleSubmitAvatar = () => {

    dispatch(updateUserInfo(data));
    setOpenModal(false);
  };

  React.useEffect(() => {
    setAvatar(
      `https://avatars.dicebear.com/api/personas/${user.user}.svg?translateY=-10&eyes[]=${eyes}&hair[]=${hair}&body[]=${body}&mouth[]=${mouth}&nose[]=${nose}&facialHair[]=${facialHair}&hairColor[]=${hairColor}&clothingColor[]=${clothingColor}&skinColor[]=${skinColor}`
    );
  }, [
    eyes,
    hair,
    body,
    mouth,
    nose,
    facialHair,
    hairColor,
    clothingColor,
    skinColor,
  ]);

  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: 2 }}
          >
            <Box
              sx={{
                postition: 'relative',
                width: '20%',
                height: '20%',
                marginLeft: '300px',
                border: '3px solid #fff',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={avatar} />
            </Box>
            Create your own avatar
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Eyes
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={eyes}
                  label="Eyes"
                  onChange={handleChangeEyes}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'sleep'}>Sleepy</MenuItem>
                  <MenuItem value={'open'}>Open</MenuItem>
                  <MenuItem value={'wink'}>Wink</MenuItem>
                  <MenuItem value={'glasses'}>Glasses</MenuItem>
                  <MenuItem value={'sunglasses'}>Sunglasses</MenuItem>
                  <MenuItem value={'happy'}>Happy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Hair
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hair}
                  label="Hair"
                  onChange={handleChangeHair}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'long'}>Long</MenuItem>
                  <MenuItem value={'sideShave'}>Side Shave</MenuItem>
                  <MenuItem value={'shortCombover'}>
                    Short Combover
                  </MenuItem>
                  <MenuItem value={'curly'}>Curly</MenuItem>
                  <MenuItem value={'bald'}>Bald</MenuItem>
                  <MenuItem value={'mohawk'}>Mohawk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Body
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={body}
                  label="Body"
                  onChange={handleChangeBody}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'squared'}>Squared</MenuItem>
                  <MenuItem value={'rounded'}>Rounded</MenuItem>
                  <MenuItem value={'small'}>Small</MenuItem>
                  <MenuItem value={'checkered'}>Checkered</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Mouth
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={mouth}
                  label="Mouth"
                  onChange={handleChangeMouth}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'smile'}>Smile</MenuItem>
                  <MenuItem value={'frown'}>Frown</MenuItem>
                  <MenuItem value={'surprise'}>Surprise</MenuItem>
                  <MenuItem value={'pacifier'}>Pacifier</MenuItem>
                  <MenuItem value={'bigSmile'}>Big Smile</MenuItem>
                  <MenuItem value={'smirk'}>Smirk</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Nose
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={nose}
                  label="Nose"
                  onChange={handleChangeNose}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'mediumRound'}>
                    Medium Round
                  </MenuItem>
                  <MenuItem value={'smallRound'}>
                    Small Round
                  </MenuItem>
                  <MenuItem value={'wrinkles'}>Wrinkles</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Facial Hair
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={facialHair}
                  label="Facial Hair"
                  onChange={handleChangeFacialHair}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'pyramid'}>Pyramid</MenuItem>
                  <MenuItem value={'walrus'}>Walrus</MenuItem>
                  <MenuItem value={'goatee'}>Goatee</MenuItem>
                  <MenuItem value={'shadow'}>Shadow</MenuItem>
                  <MenuItem value={'soulPatch'}>Soul Patch</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Hair Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={hairColor}
                  label="Hair Color"
                  onChange={handleChangeHairColor}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'black'}>Black</MenuItem>
                  <MenuItem value={'brunette'}>Brunette</MenuItem>
                  <MenuItem value={'red'}>Red</MenuItem>
                  <MenuItem value={'pink'}>Pink</MenuItem>
                  <MenuItem value={'copper'}>Copper</MenuItem>
                  <MenuItem value={'blonde'}>Blonde</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Clothing Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={clothingColor}
                  label="Clothing Color"
                  onChange={handleChangeClothingColor}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'blue'}>Blue</MenuItem>
                  <MenuItem value={'turquoise'}>Turquoise</MenuItem>
                  <MenuItem value={'purple'}>Purple</MenuItem>
                  <MenuItem value={'green'}>Green</MenuItem>
                  <MenuItem value={'red'}>Red</MenuItem>
                  <MenuItem value={'yellow'}>Yellow</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl>
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: 'white' }}
                >
                  Skin Color
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={skinColor}
                  label="Skin Color"
                  onChange={handleChangeSkinColor}
                  sx={{ color: 'white' }}
                >
                  <MenuItem value={'tone1'}>White</MenuItem>
                  <MenuItem value={'tone3'}>Asian</MenuItem>
                  <MenuItem value={'tone4'}>Burned</MenuItem>
                  <MenuItem value={'tone5'}>Coffee Latte</MenuItem>
                  <MenuItem value={'tone6'}>Black</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleSubmitAvatar}> Submit </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
