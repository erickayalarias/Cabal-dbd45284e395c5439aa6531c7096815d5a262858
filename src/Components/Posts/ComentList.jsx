import { Typography } from '@mui/material'
import React from 'react'

const ComentList = ({ comments }) => {
  return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Comments
      </Typography>
      {(comments.length <= 0) ?
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This Post Dont Have Comments Yet
        </Typography>
        :
        comments.map((postText) => {
          return (
            <Typography
              key={postText}
              id="modal-modal-description" sx={{ mt: 2 }}
            >
              {postText}
            </Typography>
          )
        })}
    </>
  )
}

export default ComentList