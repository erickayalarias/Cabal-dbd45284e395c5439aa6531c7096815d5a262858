import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getComunity, getusercommunities } from "../../features/communities";
import { CreatePostCommunity } from "./CreatePostCommunity";
import styled from "styled-components";
import { Post1 } from "../Posts/PostsText";
import { PostImage1 } from "../Posts/PostImage";
import { decryptTextComunity } from "../../helper/functions/encryptComunity";
import { PrivateRoot } from "../../HOC/PrivateRoot";

export const MyCommunity = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.session);
  const dispatch = useDispatch()
  const community = useSelector((state) => state.communities.community);
  const myCommunities = useSelector((state) => state.communities.mycommunities);
  // de momento no esta en  criptado el post cuando este hacer map del all posts

  useEffect(() => {
    dispatch(getusercommunities({
      uid: user.uid,
      publicKey: user.publicKey,
    })
    )
  }, [posts ]);

  useEffect(() => {
    const comunity=myCommunities.filter((community) => community._id === id);
    dispatch(getComunity(comunity));
    const postDecrypt=community[0].posts.map((post) => {
      var variable ={
        ...post,
        description:decryptTextComunity(post.description, community[0].password)
      }
      return variable;
    });
    setPost(postDecrypt);
  }, [myCommunities, id, community]);

  return (
    <div>
      <List>
        {post && post.reverse().map((post) => {
          const poster = post.author.publicKey === user.publicKey ? true : false;
          if (post.type === "Text") {
            return (
              <div key={post._id}>
                <Post1
                  text={post.description}
                  alias={post.author.username}
                  myPost={poster}
                  postid={post._id}
                  postLike={post.likes}
                  avatar={post.author.avatar}
                  noedit={true}
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
                  noedit={true}
                />
              </div>
            );
          }
        })}
      </List>
    </div>
  );
};

const List = styled.div`
  width: 100%;
`;
