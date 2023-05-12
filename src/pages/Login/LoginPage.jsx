import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routers/ROUTES";
import validateLoginSchema from "../../validations/loginValidation";
import useLoggedIn from "../../hooks/useLoggedIn";
import { toast } from "react-toastify";
import FormButtonsComponent from "../../components/FormButtonsComponent";
import LoginPageForm from "./LoginPageForm";
const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });
  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [disableBtn, setDisable] = useState(true);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  let attemptAndDateObject = localStorage.getItem("attemptsLeftAndDates");
  let oneDayInDate = 1000 * 60 * 60 * 24;
  useEffect(() => {
    let lastAttemptInHours, attempts;
    if (!attemptAndDateObject) {
      attempts = 3;
      lastAttemptInHours = Date.now() / oneDayInDate;
    } else {
      attemptAndDateObject = JSON.parse(attemptAndDateObject);
      attempts = attemptAndDateObject.attempts;
      lastAttemptInHours = attemptAndDateObject.lastAttemptInHours;
    }
    attemptAndDateObject = { attempts, lastAttemptInHours };
    localStorage.setItem(
      "attemptsLeftAndDates",
      JSON.stringify(attemptAndDateObject)
    );
  }, []);
  const handleBtnClick = async (ev) => {
    attemptAndDateObject = JSON.parse(
      localStorage.getItem("attemptsLeftAndDates")
    );
    if (
      Date.now() / oneDayInDate - attemptAndDateObject.lastAttemptInHours >=
      24
    ) {
      //if 24 hours or more have passed since blocked
      attemptAndDateObject.attempts = 3;
      attemptAndDateObject.lastAttemptInHours = Date.now();
    }
    if (attemptAndDateObject.attempts == 0) {
      toast.error("you are blocked!");

      return;
    }
    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      //move to homepage
      attemptAndDateObject.attempts = 3;
      attemptAndDateObject.lastAttemptInHours = Date.now() / oneDayInDate;
      localStorage.setItem(
        "attemptsLeftAndDates",
        JSON.stringify(attemptAndDateObject)
      );
      navigate(ROUTES.HOME);
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      let {
        response: { data },
      } = err;
      if (data == "Invalid email or password.") {
        attemptAndDateObject.attempts--;
        attemptAndDateObject.lastAttemptInHours = Date.now() / oneDayInDate;
        localStorage.setItem(
          "attemptsLeftAndDates",
          JSON.stringify(attemptAndDateObject)
        );
      }
      toast.error(data);
    }
  };
  const handleCancelClick = () => {
    navigate(ROUTES.HOME);
  };
  const handleResetBtnClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      cloneInputState[key] = "";
    }
    setInputsErrorsState(null);
    setDisable(true);
    setInputState(cloneInputState);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateLoginSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setDisable(false);
      return;
    }
    setDisable(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key != ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorsState(joiResponse);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <LoginPageForm
          inputStateProp={inputState}
          inputErrorsStateProp={inputsErrorsState}
          handleChangeFunc={handleInputChange}
          handleCancelClickFunc={handleCancelClick}
          handleResetClickFunc={handleResetBtnClick}
          handleLoginClickFunc={handleBtnClick}
          disableBtnProp={disableBtn}
        />
      </Box>
    </Container>
  );
};

export default LoginPage;
