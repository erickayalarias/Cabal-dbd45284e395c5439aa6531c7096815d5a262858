import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { sendinvite } from "../../features/friends";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";

export const AddFriendsForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);

  return (
    <Card
      sx={{
        marginTop: 3,
        minWidth: 700,
        mx: 6,
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
          {t("friends.add")}
        </Typography>
        <Formik
          initialValues={{
            publicKey: "",
            message: "",
          }}
          onSubmit={async (values, actions) => {
            const inviteData = {
              uid: user.uid,
              senderPublicKey: user.publicKey,
              recipientPublicKey: values.publicKey,
              password: user.privateKey,
              mensage: values.message,
            };
            dispatch(sendinvite(inviteData));
            actions.resetForm();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <TextField
                fullWidth
                label={t("friends.friendPublicKey")}
                variant="filled"
                color="secondary"
                name="publicKey"
                type="input"
                onChange={props.handleChange}
                value={props.values.publicKey}
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
                label={t("friends.sendMessage")}
                variant="filled"
                color="secondary"
                name="message"
                type="input"
                onChange={props.handleChange}
                value={props.values.message}
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
                    backgroundColor: "#cc33ff",
                    border: 1 | "solid" | "#fff",
                    ":hover": {
                      transform: "scale(1.1)",
                      color: "#cc33ff",
                      backgroundColor: "#fff",
                    },
                  }}
                >
                  {t("friends.sendRequest")}
                </Button>
              </CardActions>
            </form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
