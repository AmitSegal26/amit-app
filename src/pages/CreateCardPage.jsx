import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routers/ROUTES";
import validateCreateSchema from "../validations/createValidation";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import EditCardFieldComponent from "../components/EditCardFieldComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({});
  const [disableSaveBtn, setDisable] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateCreateSchema(inputState);
      //!   bug on server - server required a zip code to be at least 1, without letting it be unrequired
      if (!inputState.zipCode) {
        inputState.zipCode = 1;
      }
      if (!joiResponse) {
        //move to homepage
        await axios.post("/cards/", inputState);
        toast.success("Card: " + inputState.title + " ADDED!");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      toast.error("SERVER ERR: " + err.response.data);
    }
  };
  const handleCancelBtnClick = (ev) => {
    //move to homepage
    toast.warning("no changes were made");
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateCreateSchema(newInputState);
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

  const inputArr = [
    { inputName: "Title", idAndKey: "title", isReq: true },
    { inputName: "Sub Title", idAndKey: "subTitle", isReq: true },
    { inputName: "Description", idAndKey: "description", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "ZIP Code", idAndKey: "zipCode", isReq: false },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Web Page URL", idAndKey: "web", isReq: false },
    { inputName: "Image URL", idAndKey: "url", isReq: false },
    { inputName: "Image Alt", idAndKey: "alt", isReq: false },
  ];
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit card
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {inputArr.map((input) => (
              <EditCardFieldComponent
                key={input.inputName}
                inputName={input.inputName}
                inputType={input.idAndKey}
                inputValue={inputState[input.idAndKey]}
                inputChange={handleInputChange}
                inputErrors={inputsErrorsState}
                isRequired={input.isReq}
              />
            ))}
            <FormButtonsComponent
              onCancel={handleCancelBtnClick}
              onReset={handleResetBtnClick}
              onRegister={handleSaveBtnClick}
              disableProp={disableSaveBtn}
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCardPage;