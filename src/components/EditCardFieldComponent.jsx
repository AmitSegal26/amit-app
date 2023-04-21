import { Alert, Grid, TextField } from "@mui/material";
import React from "react";

const EditCardFieldComponent = ({
  inputName,
  inputType,
  inputValue,
  inputChange,
  inputErrors,
  isRequired,
}) => {
  const onInputChange = (ev) => {
    inputChange(ev);
  };
  return (
    <Grid item sm={6} xs={12}>
      <TextField
        fullWidth
        required={isRequired}
        id={inputType}
        label={inputName}
        name={inputType}
        autoComplete={inputType}
        value={inputValue ? inputValue : ""}
        onChange={onInputChange}
      />
      {inputErrors && inputErrors[inputType] && (
        <Alert severity="warning">
          {inputErrors[inputType].map((item) => (
            <div key={inputType + "-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  );
};

export default EditCardFieldComponent;
