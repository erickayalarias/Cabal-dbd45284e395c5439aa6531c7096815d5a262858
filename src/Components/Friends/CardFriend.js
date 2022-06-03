import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const CardFriend = ({
  pending,
  userData,
  redButton,
  keynum,
  cardFunction,
  cardFunctionAccept,
  message,
  typeData,
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
        image={userData.avatar}
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
          {userData.username}
        </Typography>
        <Typography
          variant="h7"
          component="div"
          sx={{
            color: "#ffffff",
            fontFamily: "Inter",
            fontWeight: 500,
            paddingLeft: 1.6,
          }}
        >
          {userData.publicKey}
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
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {pending ? (
          <Button
            sx={{
              color: "green",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: 900,
            }}
            onClick={() => cardFunctionAccept(typeData)}
          >
            {" "}
            Accept{" "}
          </Button>
        ) : null}
        <Button
          sx={{
            color: "#fc1c1c",
            fontSize: 20,
            fontFamily: "Inter",
            fontWeight: 900,
          }}
          onClick={() => cardFunction(typeData)}
        >
          {" "}
          {redButton}{" "}
        </Button>
      </CardActions>
    </Card>
  );
};
