import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { updatecommunity } from "../../features/communities";
import { CreateCommunityAvatar } from "../../Formvalidation/communityCreator";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const UpdateCommunity = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        minWidth: 700,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderRadius: 1,
        backgroundColor: "#000000",
        borderColor: "#343434",
        borderStyle: "solid",
        borderWidth: 2,
      }}
    >
      <CardContent
        sx={{
          padding: 3,
        }}
      >
        <Typography
          sx={{
            m: 2,
            fontSize: 40,
            color: "#ffffff",
            fontFamily: "Inter",
            fontWeight: 700,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {t("communities.updateCommunity")}
        </Typography>
        <Formik
          initialValues={{
            communityName: "",
            description: "",
            avatar: "",
          }}
          onSubmit={async (values, actions) => {
            const filename = values.avatar;
            const url = await CreateCommunityAvatar(filename);
            const commData = {
              uid: user.uid,
              adminPublicKey: user.publicKey,
              id: params.id,
              communityName: values.communityName,
              description: values.description,
              avatar: url,
            };

            dispatch(updatecommunity(commData));
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <TextField
                fullWidth
                label="Community Name"
                variant="filled"
                color="secondary"
                name="communityName"
                type="input"
                onChange={props.handleChange}
                value={props.values.communityName}
                required
                sx={{
                  padding: 1,
                  input: {
                    color: "#ffffff",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    background: "#343434",
                    borderRadius: 2,
                  },
                }}
                InputLabelProps={{
                  sx: {
                    display: "flex",
                    m: 1,
                    fontFamily: "Inter",
                    color: " #ffffff",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#9D4EDD",
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Community Description"
                variant="filled"
                color="secondary"
                name="description"
                type="input"
                onChange={props.handleChange}
                value={props.values.description}
                sx={{
                  padding: 1,
                  input: {
                    color: "#ffffff",
                    fontFamily: "Inter",
                    fontWeight: 700,
                    background: "#343434",
                    borderRadius: 2,
                  },
                }}
                InputLabelProps={{
                  sx: {
                    display: "flex",
                    m: 1,
                    fontFamily: "Inter",
                    color: " #ffffff",
                    [`&.${inputLabelClasses.shrink}`]: {
                      color: "#9D4EDD",
                    },
                  },
                }}
              />
              <input
                style={{ display: "none" }}
                name="avatar"
                type="file"
                accept={".jpg, .jpeg, .png"}
                onChange={(e) => {
                  props.handleChange(e);
                  const file = e.target.files[0];
                  props.setFieldValue("avatar", file);
                }}
                id="contained-button-file"
              />
              <label htmlFor="contained-button-file">
                <Button
                  fullWidth
                  component="span"
                  sx={{
                    color: "#9D4EDD",
                    backgroundColor: "#fff",
                    border: 1 | "solid" | "#fff",
                    display: "flex",
                    justifyContent: "center",
                    mx: 1,
                    my: 1,
                    height: 50,
                  }}
                >
                  {"communities.updateCommunityAvatar"}
                </Button>
              </label>
              <CardActions
                sx={{
                  display: "flex",
                  margin: 0,
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <Button
                  type="submit"
                  sx={{
                    color: "#fff",
                    backgroundColor: "#9D4EDD",
                    border: 1 | "solid" | "#fff",
                    ":hover": {
                      transform: "scale(1.2)",
                      color: "#5A189A",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  {"communities.updateCommunity"}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
