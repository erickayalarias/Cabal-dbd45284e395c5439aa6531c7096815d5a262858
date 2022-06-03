import React from 'react'
import styled from "styled-components";
import { CreatePostCommunity } from './CreatePostCommunity';

const HeaderComunity = ({modalOpen,title,description,image}) => {
  return (
    <Header>
        <ImgH src={image}/>
        <Description>
          <div>
            <Title>{title}</Title>
            <Text>{description}</Text>
          </div>
          <Icons>
            <IconFriend
            onClick={()=>{modalOpen(true)}}
            src={"https://file.rendit.io/n/dYCc0BGt8yro50sGgcz6.svg"}/>
          </Icons>
        </Description>
        <CreatePostCommunity/>
      </Header>
  )
}

export default HeaderComunity

const Header= styled.div` 
    min-width: 750px;
    width: 90%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
`
const ImgH= styled.img` 
  width: 100%;
  height: 200px;
  object-fit: cover;
`
const Description= styled.div` 
  background-color: #000000;
  height: 200px;
  color: white;
  padding: 30px 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const Title= styled.div` 
  color: white;
  font-size: 30px;
  font-weight: 800;
`
const Text= styled.div` 
  color: white;
  padding: 30px 50px;
  font-size: 15px;
`
const IconFriend= styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  `

const Icons= styled.div`
  width: 50px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
`