import { TextField } from "@mui/material";
import React, { Fragment, memo, useState } from "react";

const RegisterFieldComponent = ({
  nameOfInput,
  typeofInput,
  isReq,
  onInputChange,
  value,
}) => {
  const handleInputChange = (ev) => {
    onInputChange(ev);
  };
  if (typeofInput == "password") {
    return (
      <TextField
        type="password"
        name={nameOfInput}
        required={isReq}
        fullWidth
        id={typeofInput}
        label={nameOfInput}
        autoFocus
        value={value}
        onChange={handleInputChange}
      />
    );
  }
  return (
    <TextField
      name={nameOfInput}
      required={isReq}
      fullWidth
      id={typeofInput}
      label={nameOfInput}
      value={value}
      onChange={handleInputChange}
    />
  );
};

export default RegisterFieldComponent;
