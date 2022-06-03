import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UpdateCommunity } from "../../Components/Community/UpdateCommunity";
import styled from "styled-components";
import { MyCommunity } from "../../Components/Community/MyCommunity";
import { SendInviteToFriend } from "../../Components/Community/SendInviteToFriend";
import { CreatePostCommunity } from "../../Components/Community/CreatePostCommunity";
import HeaderComunity from "../../Components/Community/HeaderComunity";
import { Box, Modal } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoot } from "../../HOC/PrivateRoot";
import { Navigate } from "react-router-dom";


const Community = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const myCommunities = useSelector((state) => state.communities.mycommunities);
  const actual = myCommunities.filter((community) => community._id === id)[0];

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      {(!actual) ? <Navigate to="/Community" /> :
        <Page>
          <HeaderComunity
            modalOpen={setOpen}
            title={actual.communityName}
            description={actual.description}
            image={actual.avatar}
          />

          <MyCommunity />
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <SendInviteToFriend closeModal={handleClose} />
              </Box>
            </Modal>
          </div>
        </Page>
      }
    </>
  )
};

export default Community;

const FriendsRoots = styled.div`
  box-shadow: 5px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: #000000;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px auto;
  width: 200px;
  border-radius: 30px;
  padding: 13px;
  @media only screen and (max-width: 1800px) {
    width: 300px;
  }
`;

const Navfriend = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: justify;
  gap: 20px;
  cursor: pointer;
`;
const Page = styled.div`
  width:95%;
  height:100%;
  margin: 20px 
  `
