import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateRegisterSchema from "../../validations/registerValidation";
import ROUTES from "../../routers/ROUTES";
import { Switch } from "@mui/material";
import RegisterFieldComponent from "./RegisterFieldComponent";
import { toast } from "react-toastify";
import FormButtonsComponent from "../../components/FormButtonsComponent";
const RegisterPage = () => {
  const [disableState, setDisable] = useState(true);
  const [isBizState, setIsBiz] = useState(false);
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    imageUrl: "",
    imageAlt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    biz: isBizState,
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const arrOfInputs = [
    { inputName: "First Name", idAndKey: "firstName", isReq: true },
    { inputName: "Middle Name", idAndKey: "middleName", isReq: false },
    { inputName: "Last Name", idAndKey: "lastName", isReq: true },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Password", idAndKey: "password", isReq: true },
    { inputName: "Image Url", idAndKey: "imageUrl", isReq: false },
    { inputName: "Image Alt", idAndKey: "imageAlt", isReq: false },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "ZIP Code", idAndKey: "zipCode", isReq: false },
  ];
  const handleBizChange = (ev) => {
    setIsBiz(ev.target.checked);
  };
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        toast.error("Invalid Details, correct your mistakes!");
        return;
      }
      let newInputState = JSON.parse(JSON.stringify(inputState));
      //!   bug on server - server required a zip code to be at least 1, without letting it be unrequired
      if (!newInputState.zipCode) {
        newInputState.zipCode = 1;
      }
      await axios.post("/users/register", {
        firstName: newInputState.firstName,
        middleName: newInputState.middleName,
        lastName: newInputState.lastName,
        phone: newInputState.phone,
        email: newInputState.email,
        password: newInputState.password,
        imageUrl: newInputState.imageUrl,
        imageAlt: newInputState.imageAlt,
        state: newInputState.state,
        country: newInputState.country,
        city: newInputState.city,
        street: newInputState.street,
        houseNumber: newInputState.houseNumber,
        zipCode: newInputState.zipCode,
        biz: isBizState,
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
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
  const handleCancelBtnClick = () => {
    navigate(ROUTES.HOME);
  };
  const handleResetBtnClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      } else {
        setIsBiz(false);
      }
    }
    setInputsErrorsState(null);
    setDisable(true);
    setInputState(cloneInputState);
  };
  return (
    <Container component="main" maxWidth="sm">
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
          Sign up
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {arrOfInputs.map((input) => (
              <Grid item xs={12} sm={6} key={input.inputName}>
                <RegisterFieldComponent
                  nameOfInput={input.inputName}
                  typeofInput={input.idAndKey}
                  isReq={input.isReq}
                  onInputChange={handleInputChange}
                  value={inputState[input.idAndKey]}
                />
                {inputsErrorsState && inputsErrorsState[input.idAndKey] && (
                  <Alert severity="warning">
                    {inputsErrorsState[input.idAndKey].map((item) => (
                      <div key={input.idAndKey + "-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <Switch checked={isBizState} onChange={handleBizChange} />
          </Grid>
          <FormButtonsComponent
            onCancel={handleCancelBtnClick}
            onReset={handleResetBtnClick}
            onRegister={handleBtnClick}
            clickBtnText="Sign Up"
            disableProp={disableState}
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.LOGIN} sx={{ textDecoration: "none" }}>
                <Typography
                  component="h6"
                  sx={{ color: "green", textDecoration: "none" }}
                >
                  Already have an account? Sign in
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
