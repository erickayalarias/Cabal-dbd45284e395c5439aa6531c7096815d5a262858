import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { CardActions, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditAndDelete = ({ deletePost, editPost }) => {
  return (
    <div>
      <CardActions
        sx={{
          display: 'flex',
          margin: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
      >
        <IconButton
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
          <DeleteForeverIcon
            onClick={() => {
              deletePost();
            }}
          />
        </IconButton>

        <IconButton
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
          <EditIcon
            onClick={() => {
              editPost();
            }}
          />
        </IconButton>
      </CardActions>
    </div>
  );
};

const Button1 = styled.button`
  cursor: pointer;
  background-color: #9738a7;
  border-radius: 4px;
  color: #fff;
  border: 1px solid #fff;
  margin: 5px 5px;
  padding: 5px 5px;
  font-size: 15px;
  font-family: Roboto;
  font-weight: 500;
  &:hover {
    transform: scale(1.2);
  }
`;

export default EditAndDelete;
