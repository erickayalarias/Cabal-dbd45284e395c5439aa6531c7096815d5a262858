import React from 'react';
import { Form, Formik } from 'formik';
import styled from 'styled-components';
import InputUpdate from './inputUpdate';
import { useSelector, useDispatch } from 'react-redux';
import {
  initialStateCreatePost,
  onSumbitCreatePost,
} from '../../Formvalidation/postCreator';
import { CardActions, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const PostCreator1 = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  return (
    <Container>
      <Formik
        initialValues={initialStateCreatePost}
        onSubmit={async (values, actions) => {
          onSumbitCreatePost(values, actions, dispatch, user);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <PostCreatorRoot>
              <Textarea
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.TextPost}
                name="TextPost"
                placeholder={t('posts.placeholderCreate')}
              />
              {props.values.Iimage == '' ? (
                <InputUpdate
                  onChange={(e) => {
                    props.handleChange(e);
                    props.setFieldValue('Iimage', e.target.files[0]);
                  }}
                  onBlur={props.handleBlur}
                  name="Iimage"
                />
              ) : (
                <Text2>{t('posts.quantityUpload')}</Text2>
              )}
              <CardActions
                sx={{
                  display: 'flex',
                  margin: 0,
                  flexDirection: 'column',
                  justifyContent: 'space-evenly',
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    color: '#fff',
                    backgroundColor: '#cc33ff',
                    border: 1 | 'solid' | '#fff',
                    ':hover': {
                      color: '#cc33ff',
                      backgroundColor: '#fff',
                    },
                  }}
                >
                  {t('posts.post')}
                </Button>
              </CardActions>
            </PostCreatorRoot>
          </form>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div`
  margin: auto;
  width: 1000px;
  @media only screen and (max-width: 1800px) {
    width: 650px;
  }
`;
const PostCreatorRoot = styled.div`
  background-color: #000000;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  margin: 30px auto;
  width: 90%;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  border-radius: 0px 0px 10px 10px;
  border: 1px rgb(204, 102, 255) solid;
  padding: 11px 21px 13px 26px;
  transition: height 1s;
  ${
    '' /* &:hover {
      height:400px;
      flex-direction: column;
      textarea{
        width:600px;
        height:150px;
        margin:10px 0px ;
      }
      button{
          margin:auto;
      }
  } */
  }
`;
const Textarea = styled.textarea`
  background-color: #000000;
  border: none;
  width: 350px;
  font-size: 20px;
  font-family: Roboto;
  color: #b5a7a7;
  padding: 10px 0px;
  white-space: pre-wrap;
`;

const Button1 = styled.button`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px 0px 0px 0px;
  border-width: 0px;
  background: none;
  box-sizing: content-box;
  cursor: pointer;
  transition: all 1s;
`;
const FlexRow = styled.div`
  height: 50px;
  background-image: url('https://file.rendit.io/n/zj8hVTYl4TQ9aTV82l0Q.svg');
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 24px 7.2px 31px;
  position: relative;
`;
const Text1 = styled.div`
  width: 50px;
  height: 21px;
  margin: auto 10px;
  font-size: 20px;
  font-family: Roboto;
  font-weight: 400;
`;
const Text2 = styled.div`
  height: 21px;
  margin: 10px;
  color: #fff;
`;
