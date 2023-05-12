import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routers/ROUTES";
import validateCreateSchema from "../validations/createValidation";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import EditCardFieldComponent from "../components/EditCardFieldComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";
import { useSelector } from "react-redux";
import { inputArr } from "../services/editInputs";

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({});
  const [disableSaveBtn, setDisable] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const { page } = useSelector((bigRedux) => bigRedux.prevPageSlice);
  let whereTo = ROUTES.HOME;

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
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      toast.error("SERVER ERR: " + err.response.data);
    }
  };

  if (page && page.endsWith("/mycards")) {
    whereTo = ROUTES.MYCARDS;
  }
  if (page && page.endsWith("/favorites")) {
    whereTo = ROUTES.FAVCARDS;
  }
  const handleCancelBtnClick = (ev) => {
    //move to homepage
    toast.warning("no changes were made");
    navigate(whereTo);
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
    for (const input of inputArr) {
      if (
        input.idAndKey &&
        input.idAndKey != ev.target.id &&
        !newInputState[input.idAndKey]
      ) {
        joiResponse[input.idAndKey] = "";
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
          <PostAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Card
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
              clickBtnText="Create New Business Card"
              disableProp={disableSaveBtn}
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CreateCardPage;
