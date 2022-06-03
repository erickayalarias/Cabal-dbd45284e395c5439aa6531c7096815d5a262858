import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { PostImage1 } from "./PostImage";
import { Post1 } from "./PostsText";
import { decryptPost } from "../../features/Posts/encrypt";

const ListPost = ({ posts }) => {
  const user = useSelector((state) => state.session);
  const allPosts = decryptPost(posts.post, user);
  return (
    <List>
      {allPosts && allPosts.reverse().map((post) => {
        const poster =
          post.author.publicKey === user.publicKey ? true : false;
        if (post.type === 'Text') {
          return (
            <div key={post._id}>
              <Post1
                text={post.description}
                alias={post.author.username}
                myPost={poster}
                postid={post._id}
                postLike={post.likes}
                avatar={post.author.avatar}
              />
            </div>
          );
        } else {
          return (
            <div key={post._id}>
              <PostImage1
                text={post.description}
                alias={post.author.username}
                image={post.file}
                myPost={poster}
                postid={post._id}
                postLike={post.likes}
                avatar={post.author.avatar}
              />
            </div>
          );
        }
      })}
    </List>
  );
};

const List = styled.div`
  width: 100%;
`;
export default ListPost;
