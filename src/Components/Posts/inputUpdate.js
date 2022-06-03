import React from "react";
import "./inputUpdate.css";
import { useTranslation } from "react-i18next";

const InputUpdate = ({ onChange, onBlur, name }) => {
  const { t } = useTranslation();
  return (
    <div className="container-input">
      <input
        type="file"
        name={name}
        id="file-4"
        className="inputfile inputfile-4"
        data-multiple-caption="{count} archivos seleccionados"
        accept={".jpg, .jpeg, .png , video/*"}
        multiple
        onChange={onChange}
        onBlur={onBlur}
      />
      <label htmlFor="file-4">
        <span className="iborrainputfile">{t("posts.uploadFile")}</span>
      </label>
    </div>
  );
};

export default InputUpdate;
