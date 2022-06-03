import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addcomment,
  checklikepost,
  deletePostUser,
  getcoment,
  likepost,
} from "../../features/Posts";
import { Formik } from "formik";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  initialValuesPostValidation,
  onSumbitPostComent,
} from "../../Formvalidation/comentCreator";
import ComentList from "./ComentList";
import EditAndDelete from "./EditAndDelete";
import EditPost from "./EditPost";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});

export const PostImage1 = ({
  text,
  alias,
  image,
  myPost,
  postid,
  postLike,
}) => {
  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const comments = useSelector((state) => state.posts.postComments);
  const checkLike = postLike.includes(user.publicKey);
  const { t } = useTranslation();

  useEffect(() => {
    checkLike ? setLike(true) : setLike(false);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleOpenModal = (postId) => {
    const post = {
      uid: user.uid,
      _id: postId,
    };
    dispatch(getcoment({ post }));
    setTimeout(() => {
      handleOpen();
    }, 1500);
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
    <PostImageRoot>
      <Imagenrock src={image} />
      <FlexColumn>
        <NavPost>
          <Avatar1>
            <Image1 />
            <Name1>{alias}</Name1>
          </Avatar1>
          {myPost ? (
            <EditAndDelete
              editPost={() => {
                setEdit(true);
                handleOpen();
              }}
              deletePost={() => {
                swalWithBootstrapButtons
                  .fire({
                    title: t("swal.swalIsSure"),
                    text: t("swal.swalMsgSure"),
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: t("swal.swalConfirmDelete"),
                    cancelButtonText: t("swal.swalConfirmCancel"),
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
                        t("swal.swalDeleted"),
                        t("swal.swalMsgImgDeleted"),
                        t("swal.swalSuccess")
                      );
                    } else if (
                      /* Read more about handling dismissals below */
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                        t("swal.swalCancelled"),
                        t("swal.swalMsgImgCancelled"),
                        t("swal.swalError")
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
                  ? "https://file.rendit.io/n/MnyutWNyI4cDmUoO7sA5.svg"
                  : "https://file.rendit.io/n/sI5CWbdIfR9oqdN0ax5k.svg"
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
          >
            <Avatar src={"https://file.rendit.io/n/T6e0u20m1JI3nguQ4Hso.svg"} />
          </FlexRow>
          <Formik
            initialValues={initialValuesPostValidation}
            onSubmit={(values, actions) => {
              onSumbitPostComent(values, actions, dispatch, user, postid);
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
                <InputTextStyled
                  type="input"
                  placeholder={t("comments.placeholderCreate")}
                  name="commentPost"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.commentPost}
                />
                <Button1 type="submit">
                  <Text1>{t("comments.addComent")}</Text1>
                </Button1>
              </form>
            )}
          </Formik>
        </Comentarios>
      </FlexColumn>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {edit ? (
              <EditPost text={text} postid={postid} />
            ) : (
              <ComentList comments={comments} />
            )}
          </Box>
        </Modal>
      </div>
    </PostImageRoot>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#343434",
  color: "#fff",
  borderRadius: "20px",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
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
  width: 100%;
  :: placeholder {
    color: #b5a7a7;
  }
  display: inline-block;
  outline-width: 0px;
`;

const Text1 = styled.div`
  color: #9d4edd;
  width: 120px;
  height: 21px;
  margin: auto;
  font-size: 15px;
  font-family: Roboto;
  font-weight: 400;
`;

const Button1 = styled.button`
  display: flex;
  align-self: flex-start;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 13px 0px 0px 0px;
  border-width: 1px;
  border-radius: 5px;
  background: none;
  box-sizing: content-box;
  cursor: pointer;
  transition: all 1s;
`;

const PostImageRoot = styled.div`
  border: 2px solid #343434;
  background-color: #000000;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 15px auto;
  max-width: 1000px;
  width: 50%;
  align-items: center;
  border-radius: 30px;
  min-width: 700px;
  padding: 0px 2px;
  min-width: 700px;
  @media only screen and (max-width: 1500px) {
    width: 80%;
  }
`;
const Imagenrock = styled.img`
  border: 1px solid #343434;
  width: 360px;
  height: 360px;
  border-radius: 25px;
`;
const FlexColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-end;
  padding: 14px 0px 11px 0px;
  margin-right: 10px;
`;
const NavPost = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 84px;
  justify-content: center;
  align-items: center;
  margin: 0px 10px 3px 0px;
`;
const Avatar1 = styled.div`
  width: 280px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 18px;
  align-items: center;
`;
const Image1 = styled.div`
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
  height: 170px;
  font-size: 14px;
  font-family: Roboto;
  font-weight: 400;
  color: #ffffff;
  margin: 10px 50px 0px 0px;
`;
const Comentarios = styled.div`
  width: 80%;
  background-color: #000000;
  display: flex;
  opacity: 0.9;
  align-self: center;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px 5px 30px 30px;
  padding: 13px 21px 2px 21px;
`;
const FlexRow = styled.div`
  width: 170px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
  align-items: center;
`;
const Avatar = styled.img`
  width: 28px;
  height: 28px;
`;
