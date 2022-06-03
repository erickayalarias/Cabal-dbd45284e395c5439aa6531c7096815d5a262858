import { Route, Routes } from 'react-router-dom';
import Layout from './Components/layout/Layout';
import { Home } from './pages/logIn/Home';
import HomePage from './pages/news/HomePage';
import { Registration } from './pages/Registration/Registration';
import { Buffer } from 'buffer';
import { Authentification } from './pages/middleware';
import MusicView from './pages/music/music';
import { Test } from './pages/test';
import Friends from './pages/friends/Friends';
import Communities from './pages/communities/Communities';
import { useDispatch } from 'react-redux';
import socket from './helper/socket';
import Community from './pages/communities/Community';
import { Chat } from './pages/chat/Chat';
import { ElegirChat } from './pages/chat/elegirChat';

function App() {
  const dispatch = useDispatch();
  if (!window.Buffer) {
    window.Buffer = Buffer;
  }
  socket.on('connect', () => {
    socket.on('a', (data) => {

    });
  });
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/auth" element={<Authentification />} />
        <Route element={<Layout />}>
          <Route path="/News" element={<HomePage />} />
          <Route path="/Friends" element={<Friends />} />
          <Route path="/community" element={<Communities />} />
          <Route path="/community/:id" element={<Community />} />
          <Route path="/chats" element={<ElegirChat />} />
          <Route path="/chats/:chatId" element={<Chat />} />
          <Route path="/music" element={<MusicView />} />
        </Route>
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
