import * as Yup from "yup";

export const INITIAL_FORM_STATE_ADD_PLAYLIST = {
  title: "",
  musics: [],
};

export const FORM_VALIDATION_SCHEMA_ADD_PLAYLIST = Yup.object().shape({
  title: Yup.string().required("No title provided."),
});
