import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routers/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validations/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import EditCardFieldComponent from "../components/EditCardFieldComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";
import { useSelector } from "react-redux";
import { inputArr } from "../services/editInputs";

const EditCardPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [disableSaveBtn, setDisable] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const { page } = useSelector((bigRedux) => bigRedux.prevPageSlice);
  let whereTo = ROUTES.HOME;
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          // there were errors = incorrect id
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.__v;
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.address;
        //!.address is not acceptable by the server!
        setInputState(newInputState);

        if (!validateEditSchema(newInputState)) {
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
  }, [id]);
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      //!   bug on server - server required a zip code to be at least 1, without letting it be unrequired
      let newInputState = JSON.parse(JSON.stringify(inputState));
      delete newInputState.zipCode;
      if (!joiResponse) {
        //move to homepage
        await axios.put("/cards/" + id, newInputState);
        toast.success("Card: " + inputState.title + " UPDATED!");
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
  if (page.endsWith("/mycards")) {
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
    const joiResponse = validateEditSchema(newInputState);
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
              clickBtnText="Save Changes"
              disableProp={disableSaveBtn}
            />
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditCardPage;
