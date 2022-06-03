import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
} from '@mui/material';
import { Formik, Form } from 'formik';

import TextfieldWrapper from '../../Components/FormsUI/Textfield';
import ButtonWrapper from '../../Components/FormsUI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  FORM_VALIDATION_SCHEMA,
  INITIAL_FORM_STATE,
  onSubmitRegistered,
} from '../../Formvalidation/registerValidation';
import {
  FORM_VALIDATION_SCHEMA_UserPass,
  INITIAL_FORM_STATE_UserPass,
  onSubmitPass,
} from '../../Formvalidation/paswordValidation';
import {
  Background,
  Points,
} from '../../Components/ThreeJS/Background';
import BackgroundImage from './gettyimages-1213368040-612x612.jpeg';
import BackgroundImage2 from './x.jpeg';

// import TextfieldWrapper from '../../Components/FormsUI/Textfield';

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { publicKey, pasdb, uid, pass } = useSelector(
    (state) => state.session
  );

  const [initialStateForm, setinitialStateForm] = useState(
    INITIAL_FORM_STATE
  );
  const [schemaValidation, setschemaValidation] = useState(
    FORM_VALIDATION_SCHEMA
  );

  const [userLocal, setuserLocal] = useState(true);
  useEffect(() => {
    if (!publicKey && !pasdb) {
      //no registrado
      navigate('/');
    } else if (pasdb === 'local-NotExist') {
      // register but local storage no exist
      setuserLocal(false);
      setinitialStateForm(INITIAL_FORM_STATE_UserPass);
      setschemaValidation(FORM_VALIDATION_SCHEMA_UserPass);
    }
  }, []);
  useEffect(() => {
    if (uid !== '' && pass !== '') {
      // ya esta registrado
      if (uid === pass) {
        navigate('/news');
      }
    }
  }, [uid]);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${BackgroundImage2})`,
          backgroundSize: 'cover',
          backgroundPositionY: '-87px',
          backgroundPositionX: '-30px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Card
          sx={{
            minWidth: 500,
            minHeight: 200,
            backgroundColor: 'black',
            border: '2px solid purple',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Container>
            <Formik
              initialValues={{
                ...initialStateForm,
              }}
              validationSchema={schemaValidation}
              onSubmit={(values, actions) => {
                if (userLocal) {
                  onSubmitRegistered(
                    values,
                    dispatch,
                    publicKey,
                    navigate
                  );
                } else {
                  onSubmitPass(values, actions, dispatch, navigate);
                }
              }}
            >
              <Form>
                <Grid
                  container
                  spacing={2}
                  sx={{ marginTop: 1, marginBottom: 1 }}
                >
                  {userLocal && (
                    <>
                      <Grid item xs={12}>
                        <Typography>Alias</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextfieldWrapper
                          name="alias"
                          label="Alias"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>Password</Typography>
                      </Grid>
                    </>
                  )}

                  <Grid item xs={12}>
                    <TextfieldWrapper
                      id="outlined-basic"
                      variant="outlined"
                      sx={{ color: 'white' }}
                      name="password"
                      label={
                        userLocal
                          ? 'password'
                          : 'Remember the password'
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ButtonWrapper>Submit</ButtonWrapper>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Container>
        </Card>
      </Box>
    </>
  );
};
