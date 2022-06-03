import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { useParams } from "react-router-dom";
import { communitysendinvite } from "../../features/communities";
import { useTranslation } from "react-i18next";

export const SendInviteToFriend = ({ closeModal }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session);
  const communityId = useParams();
  const { t } = useTranslation();

  return (
    <Card
      sx={{
        width: "30%",
        marginTop: 20,
        minWidth: 700,
        mx: "auto",
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
          {t("communities.inviteFriendCommunity")}
        </Typography>
        <Formik
          initialValues={{
            publicKey: "",
            message: "",
          }}
          onSubmit={(values, actions) => {
        
            const inviteData = {
              uid: user.uid,
              communityId: communityId.id,
              userPublicKey: values.publicKey,
              mensage: values.message,
            };
            dispatch(communitysendinvite(inviteData));
            actions.resetForm();
            closeModal();
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <TextField
                fullWidth
                label="Friend Public Key"
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
                label="Send a message"
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
                    backgroundColor: "#9D4EDD",
                    border: 1 | "solid" | "#fff",
                    ":hover": {
                      transform: "scale(1.2)",
                      color: "#5A189A",
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
