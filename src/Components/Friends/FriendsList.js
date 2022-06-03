import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallfriends, removefriend } from "../../features/friends";
import { CardFriend } from "./CardFriend";
import styled from "styled-components";
import { deleteChat } from "../../features/chat";
import { useTranslation } from "react-i18next";

export default function FriendsList() {
  const user = useSelector((state) => state.session);
  const allFriends = useSelector((state) => state.friends);
  const chats = useSelector((state) => state.chat.chats);
  const dispatch = useDispatch();
  const allFriendsArray = allFriends.friendsArray;
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      getallfriends({
        uid: user.uid,
        publicKey: user.publicKey,
      })
    );
  }, []);

  const deleteFriend = (friendPK) => {
    chats.filter((chat) => {
      if (chat.users.find((user) => user.publicKey === friendPK)) {
        dispatch(deleteChat(chat._id));
      }
    });

    dispatch(
      removefriend({
        uid: user.uid,
        publicKey: user.publicKey,
        friendPublicKey: friendPK,
      })
    );
  };

  return allFriendsArray.length > 0 ? (
    allFriendsArray.map((friends) => {
      return (
        <CardFriend
          pending={false}
          userData={friends.user}
          redButton={t("friends.delete")}
          key={friends._id}
          cardFunction={deleteFriend}
          typeData={friends.user.publicKey}
        />
      );
    })
  ) : (
    <DivMessage> {t("friends.emptylistFriends")} </DivMessage>
  );
}
const DivMessage = styled.div`
  height: 158px;
  color: #9d4edd;
  font-size: 2em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0.1em auto;
  width: 100%;
  align-items: center;
  padding: 0px 2px;
  font-weight: 800;
  @media only screen and (max-width: 1500px) {
    width: 80%;
    min-width: 700px;
  }
`;
