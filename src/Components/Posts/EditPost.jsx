import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editPost } from '../../features/Posts';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: true,
});

const EditPost = ({ text, postid, handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const [state, setState] = React.useState(text);
  const handelchange = (e) => {
    setState(e.target.value);
  };
  return (
    <Cont>
      <h1>Editar posts</h1>
      <Input onChange={handelchange} value={state} />
      <Button1
        onClick={() => {
          const editP = {
            uid: user.uid,
            _id: postid,
            data: {
              title: '',
              description: state,
            },
          };
          handleClose();
          swalWithBootstrapButtons
            .fire({
              title: 'Are you sure?',
              text: 'You are going to update the file!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Yes, update it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                dispatch(editPost(editP));
                swalWithBootstrapButtons.fire(
                  'Updated!',
                  'Your file has been updated.',
                  'success'
                );
              } else if (
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Your file is safe :)',
                  'error'
                );
              }
            });
        }}
      >
        Editar
      </Button1>
    </Cont>
  );
};

const Cont = styled.div`
  background-color: #343434;
  display: flex;
  flex-direction: column;
  color: white;
`;
const Input = styled.textarea`
  width: 90%;
  height: 200px;
  margin: 10px auto;
  border: none;
  background-color: #343434;
  color: white;
`;

const Button1 = styled.button`
  background-color: #9d4edd;
  border-radius: 4px;
  width: 100px;
  color: #fff;
  border: 1px solid #fff;
  margin: auto;
  padding: 5px 5px;
  font-size: 15px;
  font-family: Roboto;
  font-weight: 500;
  &:hover {
    transform: scale(1.1);
  }
`;
export default EditPost;
