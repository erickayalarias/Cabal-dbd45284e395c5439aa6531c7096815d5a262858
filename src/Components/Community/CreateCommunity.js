import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { createcommunity } from "../../features/communities";
import { CreateCommunityAvatar } from "../../Formvalidation/communityCreator";
import { Alert } from "@mui/material";
import { useTranslation } from "react-i18next";

//Create a one community

const CreateCommunitySchema = Yup.object().shape({
  communityName: Yup.string()
    .min(2, "The name is Too Short!")
    .max(50, "The name is Too Long!")
    .required("Community Name is Required"),
  description: Yup.string()
    .min(2, "The description is Too Short!")
    .max(50, "The description is Too Long!")
    .required("Commmunity Description is Required"),
  password: Yup.string()
    .min(6, "The Password have to be minimum 6 characters")
    .required("Community Password isRequired"),
  avatar: Yup.mixed().required(),
});

export const CreateCommunity = ({ handleClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const { mycommunities } = useSelector((state) => state.communities);
  const { t } = useTranslation();

  useEffect(() => {}, [mycommunities]);

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
          {t("communities.create")}
        </Typography>
        <Formik
          initialValues={{
            communityName: "",
            description: "",
            avatar: "",
            password: "",
          }}
          validationSchema={CreateCommunitySchema}
          onSubmit={async (values, actions) => {
            const filename = values.avatar;
            handleClose();
            const url = await CreateCommunityAvatar(filename);
            const commData = {
              uid: user.uid,
              adminPublicKey: user.publicKey,
              communityName: values.communityName,
              description: values.description,
              password: values.password,
              avatar: url,
            };
            dispatch(createcommunity(commData));
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
              {props.errors.communityName && props.touched.communityName ? (
                <Alert severity="error">{props.errors.communityName}</Alert>
              ) : null}
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
              {props.errors.description && props.touched.description ? (
                <Alert severity="error">{props.errors.description}</Alert>
              ) : null}
              <TextField
                fullWidth
                label="Password"
                variant="filled"
                color="secondary"
                name="password"
                type="input"
                onChange={props.handleChange}
                value={props.values.password}
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
              {props.errors.password && props.touched.password ? (
                <Alert severity="error">{props.errors.password}</Alert>
              ) : null}
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
              {props.errors.avatar && props.touched.avatar ? (
                <Alert severity="error"> {props.errors.avatar} </Alert>
              ) : null}
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
                  {t("communities.updateCommunityAvatar")}
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
                  {t("communities.create")}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
