import React from 'react';
import {
  Conversation,
  ConversationList,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChats, getUsersChats } from '../../features/chat';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PrivateRoot } from '../../HOC/PrivateRoot';

export const ElegirChat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const user = useSelector((state) => state.chat.user);
  React.useEffect(() => {
    dispatch(getUserChats(user._id));
  }, []);
  return (
    <PrivateRoot>
      {chats && (
        <ConversationList
          style={{
            width: '99.5%',
            height: '90vh',

          }}
          scrollable
        >
          {chats.map((c) => {
            const noUser = c.users.find((u) => u._id !== user._id);
            return (
              <Conversation
                onClick={() => {
                  navigate(`./${c._id}`);
                }}
                key={c._id}
                name={noUser.name}
                style={{
                  cursor: 'pointer',
                  color: 'white',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                }}
              >
                <Avatar src={noUser.avatar} name={noUser.name} />
              </Conversation>
            );
          })}
        </ConversationList>
      )}
    </PrivateRoot>
  );
};
