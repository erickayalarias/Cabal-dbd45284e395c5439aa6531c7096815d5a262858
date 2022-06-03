import React, { useState } from 'react';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  MessageSeparator,
  TypingIndicator,
  EllipsisButton,
  VideoCallButton,
  VoiceCallButton,
  ConversationHeader,
  Conversation,
  ConversationList,
  Search,
  Sidebar,
  Avatar,
} from '@chatscope/chat-ui-kit-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserChats,
  addMessages,
  getMessages,
  setMessage,
  setuser,
} from '../../features/chat';
import { useNavigate, useParams } from 'react-router-dom';
import { PrivateRoot } from '../../HOC/PrivateRoot';
import socket from '../../helper/socket';
import {
  decryptChat,
  encryptChat,
} from '../../helper/functions/encryptChat';
import { updateUserInfo } from '../../features/session';

export const Chat = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userPrivateKey = useSelector(
    (state) => state.session.privateKey
  );
  const user = useSelector((state) => state.chat.user);
  const mChats = useSelector((state) => state.chat.messages);
  const chats = useSelector((state) => state.chat.chats);
  const chat = useSelector((state) => state.chat.actualChat);

  const session = useSelector((state) => state.session);

  React.useEffect(() => {
    dispatch(getUserChats(user._id));
    dispatch(getMessages(chatId));
  }, [chatId]);

  React.useEffect(()  => {
    socket.on('DEVUELTA', (message) => {

      if(message.chat === chatId){

        dispatch(getMessages(message.chat));
      }
    });
  }, []);
  React.useEffect(() => {
  
    const data = {
      uid: session.uid,
      publicKey: session.publicKey,
      data: {
        images: [
          0,
          session.notificaciones[1],
          session.notificaciones[2],
        ],
      },
    };
    dispatch(updateUserInfo(data));
  }, [mChats]);
  const [messageInputValue, setMessageInputValue] = useState('');

  const handleMessageInputChange = async(e) => {
    //! Encriptado mensaje chat
    const message = {
      chat: chatId,
      user: user._id,
      message: encryptChat(userPrivateKey, messageInputValue),
    };

    await dispatch(addMessages(message));
    socket.emit('message', message);
    setMessageInputValue('');
  };
  return (
    <div
      style={{
        height: '90vh',
        width: '99.5%',
        margin: '0px 0px',
      }}
    >
      <PrivateRoot>
        <MainContainer responsive>
          <Sidebar position="left" scrollable={true}>
            <ConversationList>
              {' '}
              {chats &&
                chats.map((c) => {
                  if (c._id !== chatId) {
                    const NOuser = c.users.find(
                      (u) => u._id !== user._id
                    );
                    return (
                      <Conversation
                        onClick={() => {
                          navigate(`/Chats/${c._id}`);
                        }}
                        key={c._id}
                        name={NOuser.name}
                      >
                        <Avatar src={NOuser.avatar} />
                      </Conversation>
                    );
                  } else {
                      const NOuser = c.users.find(
                        (u) => u._id !== user._id
                      );
                    if(chat.name !==  NOuser.name){
                      dispatch(setuser(NOuser));
                    return '';
                    }
                  }
                })}
            </ConversationList>
          </Sidebar>

          <ChatContainer>
            <ConversationHeader>
              <ConversationHeader.Back />
              <Avatar src={chat.avatar} name={chat.name} />
              <ConversationHeader.Content userName={chat.name} />
            </ConversationHeader>
            <MessageList>
              {mChats &&
                mChats.map((m) => {
                  return (
                    <Message
                      key={m._id}
                      model={{
                        message: decryptChat(
                          userPrivateKey,
                          m.message
                        ),
                        sentTime: '15 mins ago',
                        sender: m.user.name,
                        direction:
                          m.user._id === user._id
                            ? 'outgoing'
                            : 'incoming',
                        position: 'single',
                      }}
                    />
                  );
                })}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              value={messageInputValue}
              onChange={(val) => setMessageInputValue(val)}
              onSend={(value) => {
                handleMessageInputChange();
              }}
              attachButton={false}
              className="message-input"
            />
          </ChatContainer>
        </MainContainer>
      </PrivateRoot>
    </div>
  );
};
