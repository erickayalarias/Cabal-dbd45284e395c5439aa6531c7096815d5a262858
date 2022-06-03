import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PostCreator1 } from '../../Components/Posts/CreatePosts';
import { getPost } from '../../features/Posts';
import ListPost from '../../Components/Posts/ListPost';
import { PrivateRoot } from '../../HOC/PrivateRoot';

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const posts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPost({ uid: user.uid, publicKey: user.publicKey }));
  }, [user.publicKey, posts.stateDispach, posts.post]);

  return (
    <PrivateRoot>
      <PostCreator1 />
      <ListPost posts={posts} />
    </PrivateRoot>
  );
};

export default HomePage;
