import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateProfileEditSchema from "../../validations/profileEditValidation";
import ROUTES from "../../routers/ROUTES";
import { Button, CircularProgress, Switch } from "@mui/material";
import { toast } from "react-toastify";
import profileInputArr from "../../services/editInputs";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import EditCardFieldComponent from "../../components/EditCardFieldComponent";
import ProfilePageTitles from "./ProfilePageTitles";
import ProfilePageBtnsAndLinks from "./ProfilePageBtnsAndLinks";
import FirstPageIcon from "@mui/icons-material/FirstPage";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const [disableState, setDisable] = useState(true);
  const [isBizState, setIsBiz] = useState(false);
  const [inputState, setInputState] = useState(null);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [disableFieldState, setDisableFieldState] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/users/userInfo");
        let newInputState = {
          ...data,
        };
        delete newInputState._id;
        delete newInputState.isAdmin;
        setIsBiz(newInputState.biz);
        delete newInputState.biz;
        if (!newInputState.zipCode || newInputState.zipCode <= 1) {
          delete newInputState.zipCode;
        }
        setInputState(newInputState);
        if (!validateProfileEditSchema(newInputState)) {
          setDisable(false);
        }
      } catch (err) {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error(err.response.data);
      }
    })();
  }, []);
  const handleBizChange = (ev) => {
    setIsBiz(ev.target.checked);
  };
  const handleOpenEditClick = () => {
    setDisableFieldState(!disableFieldState);
  };
  const handleBtnClick = async (ev) => {
    try {
      const joiResponse = validateProfileEditSchema(inputState);
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
      newInputState.biz = isBizState;
      await axios.put("/users/userInfo", {
        firstName: newInputState.firstName,
        middleName: newInputState.middleName,
        lastName: newInputState.lastName,
        phone: newInputState.phone,
        email: newInputState.email,
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
      localStorage.clear();
      dispatch(authActions.logout());
      toast.warning(
        "Profile Updated! " +
          newInputState.firstName +
          " " +
          newInputState.lastName +
          ", please log in once again in order to see the changes!"
      );
      navigate(ROUTES.HOME);
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      toast.error("ERR " + err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateProfileEditSchema(newInputState);
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
  if (!inputState) {
    return <CircularProgress />;
  }
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={3}>
            <Button
              color="primary"
              variant="outlined"
              onClick={handleCancelBtnClick}
            >
              <FirstPageIcon />
              Back To Home
            </Button>
          </Grid>
        </Grid>
        <ProfilePageTitles disableFieldStateProp={disableFieldState} />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {profileInputArr.map((input) => (
              <EditCardFieldComponent
                key={"profile_inputs" + input.inputName}
                inputName={input.inputName}
                inputType={input.idAndKey}
                isRequired={input.isReq}
                inputChange={handleInputChange}
                inputValue={inputState[input.idAndKey]}
                inputErrors={inputsErrorsState}
                disabledProp={disableFieldState}
              ></EditCardFieldComponent>
            ))}
          </Grid>
          <Switch
            checked={isBizState}
            disabled={disableFieldState}
            onChange={handleBizChange}
          />
          <ProfilePageBtnsAndLinks
            onOpenEditDetails={handleOpenEditClick}
            onCancelBtn={handleCancelBtnClick}
            onResetBtn={handleResetBtnClick}
            onRegisterBtn={handleBtnClick}
            disableFieldStateProp={disableFieldState}
            disableBtnProp={disableState}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default ProfilePage;
