import { Alert, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import FormButtonsComponent from "../../components/FormButtonsComponent";
import { Link } from "react-router-dom";
import ROUTES from "../../routers/ROUTES";

const LoginPageForm = ({
  inputStateProp,
  inputErrorsStateProp,
  handleChangeFunc,
  handleCancelClickFunc,
  handleResetClickFunc,
  handleLoginClickFunc,
  disableBtnProp,
}) => {
  return (
    <Box component="div" noValidate sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={inputStateProp.email}
            onChange={handleChangeFunc}
          />
          {inputErrorsStateProp && inputErrorsStateProp.email && (
            <Alert severity="warning">
              {inputErrorsStateProp.email.map((item) => (
                <div key={"email-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={inputStateProp.password}
            onChange={handleChangeFunc}
          />
          {inputErrorsStateProp && inputErrorsStateProp.password && (
            <Alert severity="warning">
              {inputErrorsStateProp.password.map((item) => (
                <div key={"password-errors" + item}>{item}</div>
              ))}
            </Alert>
          )}
        </Grid>
      </Grid>
      <FormButtonsComponent
        onCancel={handleCancelClickFunc}
        onReset={handleResetClickFunc}
        onRegister={handleLoginClickFunc}
        clickBtnText="Sign In"
        disableProp={disableBtnProp}
      />
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Link to={ROUTES.REGISTER}>
            <Typography variant="body2">
              Did not have an account? Sign up
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPageForm;
