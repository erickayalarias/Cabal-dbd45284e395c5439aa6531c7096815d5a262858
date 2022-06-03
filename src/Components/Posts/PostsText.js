import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  deletePostUser,
  likepost,
  setPostComments,
} from '../../features/Posts';
import { addcomment, getcoment } from '../../features/Posts';
import { Formik } from 'formik';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ComentList from './ComentList';
import EditPost from './EditPost';
import EditAndDelete from './EditAndDelete';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import comment from '../../assets/img/comments-32.png';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger',
  },
  buttonsStyling: true,
});

export const Post1 = ({
  text,
  alias,
  myPost,
  postid,
  postLike,
  avatar,
  noedit
}) => {
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);
  const [like, setLike] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const comments = useSelector((state) => state.posts.postComments);
  const checkLike = postLike.includes(user.publicKey);

  useEffect(() => {
    checkLike ? setLike(true) : setLike(false);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    dispatch(setPostComments([]));
  };
  const handleOpenModal = (postId) => {
    const post = {
      uid: user.uid,
      _id: postId,
    };

    dispatch(getcoment({ post }));
    setTimeout(() => {
      handleOpen();
    }, 200);
  };

  const handleLike = async () => {
    setLike(!like);
    dispatch(
      likepost({
        uid: user.uid,
        publicKey: user.publicKey,
        _id: postid,
      })
    );
  };

  return (
    <PostRoot>
      <NavPost>
        <Avatar1>
          <Image1 src={avatar} />
          <Name1>{alias}</Name1>
        </Avatar1>
        {myPost && !noedit ? (
          <EditAndDelete
            editPost={() => {
              setEdit(true);
              handleOpen();
            }}
            deletePost={() => {
              swalWithBootstrapButtons
                .fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Yes, delete it!',
                  cancelButtonText: 'No, cancel!',
                  reverseButtons: true,
                })
                .then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      deletePostUser({
                        uid: user.uid,
                        _id: postid,
                      })
                    );
                    swalWithBootstrapButtons.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    );
                  } else if (
                    // TODO Read more about handling dismissals below
                    result.dismiss === Swal.DismissReason.cancel
                  ) {
                    swalWithBootstrapButtons.fire(
                      'Cancelled',
                      'Your imaginary file is safe :)',
                      'error'
                    );
                  }
                });
            }}
          />
        ) : (
          <Like
            onClick={handleLike}
            src={
              like
                ? 'https://file.rendit.io/n/MnyutWNyI4cDmUoO7sA5.svg'
                : 'https://file.rendit.io/n/sI5CWbdIfR9oqdN0ax5k.svg'
            }
          />
        )}
      </NavPost>
      <Paragraph>{text}</Paragraph>
      <Comentarios>
        <FlexRow
          onClick={() => {
            handleOpenModal(postid);
          }}
        ></FlexRow>
        <Formik
          initialValues={{
            commentPost: '',
          }}
          onSubmit={(values, actions) => {
            const addComment = {
              uid: user.uid,
              _id: postid,
              data: {
                comments: values.commentPost,
              },
            };

            dispatch(addcomment(addComment));
            actions.resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <FlexRow>
                <Avatar
                  src={comment}
                  onClick={() => {
                    handleOpenModal(postid);
                  }}
                />
                <InputTextStyled
                  type="input"
                  placeholder="Write a Comment"
                  name="commentPost"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.commentPost}
                />
                <Button1 type="submit">Add Comment</Button1>
              </FlexRow>
            </form>
          )}
        </Formik>
      </Comentarios>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {edit ? (
              <EditPost
                handleClose={handleClose}
                text={text}
                postid={postid}
              />
            ) : (
              <ComentList comments={comments} />
            )}
          </Box>
        </Modal>
      </div>
    </PostRoot>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#343434',
  color: '#fff',
  borderRadius: '20px',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
};

const InputTextStyled = styled.input`
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 18px;
  color: #9d4edd;
  padding: 0px;
  border-width: 0px;
  background: none;
  width: 50%;
  :: placeholder {
    color: #b5a7a7;
  }
  display: inline-block;
  outline-width: 0px;
`;

const Button1 = styled.button`
  cursor: pointer;
  background-color: #cc33ff;
  border-radius: 4px;
  color: #fff;
  width: 100px;
  border: 1px solid #fff;
  margin: 5px 5px;
  padding: 5px 5px;
  font-size: 10px;
  font-family: Roboto;
  font-weight: 500;
  &:hover {
    color: #cc33ff;
    background-color: #fff;
    border: 1px solid #cc33ff;
  }
`;

const PostRoot = styled.div`
  border: 2px solid #343434;
  height: 302px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 15px auto;
  max-width: 1000px;
  width: 50%;
  min-width: 650px;
  align-items: flex-end;
  border-radius: 30px;
  padding: 6px 7px;
  @media only screen and (max-width: 1500px) {
    width: 80%;
  }
`;
const NavPost = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0px 16px 23px 0px;
`;
const Avatar1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 18px;
  align-items: center;
  cursor: pointer;
`;
const Image1 = styled.img`
  width: 69px;
  height: 69px;
  background-color: #bbd4e5;
  border-radius: 1000px;
`;
const Name1 = styled.div`
  font-size: 32px;
  font-family: Roboto;
  font-weight: 400;
  color: #787878;
`;
const Like = styled.img`
  width: 40px;
  height: 40px;
  align-self: flex-start;
  cursor: pointer;
`;
const Paragraph = styled.div`
  width: 80%;
  height: 120px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  color: #ffffff;
  margin: 0px 53px 17px 0px;
`;
const Comentarios = styled.div`
  width: 95%;
  display: flex;
  opacity: 0.9;
  align-self: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px 5px 30px 30px;
  padding: 13px 21px 25px 21px;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
  align-items: center;
`;
const Avatar = styled.img`
  width: 28px;
  height: 28px;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
