import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//Return information one community
export const CommunityCard = ({
  commData,
  redButton,
  greenButton,
  keynum,
  cardFunction,
  cardFunctionAccept,
  message,
}) => {
  return (
    <Card
      key={keynum}
      sx={{
        minWidth: 650,
        mx: 8,
        my: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 5,
        backgroundColor: "#000000",
        borderColor: "#343434",
        borderStyle: "solid",
        borderWidth: 2,
      }}
    >
      <CardMedia
        sx={{
          margin: 2,
          width: 150,
          height: 150,
          flexDirection: "row",
          borderRadius: 20,
        }}
        component="img"
        image={commData.avatar}
      />
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          sx={{
            color: "#ffffff",
            fontFamily: "Inter",
            fontWeight: 700,
            padding: 0.8,
          }}
        >
          {commData.communityName}
        </Typography>
        <Typography
          variant="h5"
          component="div"
          sx={{
            color: "#ffffff",
            fontFamily: "Inter",
            fontWeight: 500,
            padding: 0.8,
          }}
        >
          {message}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          margin: 0,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Button
          sx={{
            paddingX: 2,
            marginX: 2,
            backgroundColor: "green",
            color: "white",
            fontSize: 15,
            fontFamily:"Segoe UI Emoji",
            fontWeight: 700,
            borderRadius: 8,
            ':hover': {
              transform: 'scale(1.2)',
              color: 'green',
              backgroundColor: '#000000',
            }
          }}
          onClick={() => cardFunctionAccept(commData)}
        >
          {greenButton}
        </Button>
        <Button
          sx={{
            paddingX: 2,
            marginX: 2,
            backgroundColor: "red",
            color: "white",
            fontSize: 15,
            fontFamily:"Segoe UI Emoji",
            fontWeight: 700,
            borderRadius: 8,
            ':hover': {
              transform: 'scale(1.2)',
              color: 'red',
              backgroundColor: '#000000',
            }
          }}
          onClick={() => cardFunction(commData)}
        >
          {redButton}
        </Button>
      </CardActions>
    </Card>
  );
};
