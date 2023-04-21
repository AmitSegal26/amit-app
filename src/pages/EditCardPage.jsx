import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ROUTES from "../routers/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validations/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import EditCardFieldComponent from "../components/EditCardFieldComponent";

const EditCardPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [disableSaveBtn, setDisable] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          // there was errors = incorrect id
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
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.address;
        //.address is not acceptable by the server!
        setInputState(newInputState);
        if (!validateEditSchema(newInputState)) {
          setDisable(false);
        }
      } catch (err) {
        toast.error(err);
      }
    })();
  }, [id]);

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      if (joiResponse) {
      }
      setInputsErrorsState(joiResponse);

      if (!joiResponse) {
        //move to homepage
        await axios.put("/cards/" + id, inputState);
        toast.success("Card: " + inputState.title + " UPDATED!");
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleCancelBtnClick = (ev) => {
    //move to homepage
    toast.info("no changes were made");
    navigate(ROUTES.HOME);
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

  if (!inputState) {
    return <CircularProgress />;
  }
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
            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                id="url"
                label="Url"
                name="url"
                autoComplete="url"
                value={inputState.url ? inputState.url : ""}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.url && (
                <Alert severity="warning">
                  {inputsErrorsState.url.map((item) => (
                    <div key={"url-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                value={inputState.title}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.title && (
                <Alert severity="warning">
                  {inputsErrorsState.title.map((item) => (
                    <div key={"title-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="subTitle"
                label="Sub title"
                type="text"
                id="subTitle"
                autoComplete="subTitle"
                value={inputState.subTitle}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.subTitle && (
                <Alert severity="warning">
                  {inputsErrorsState.subTitle.map((item) => (
                    <div key={"subTitle-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="description"
                label="Description"
                id="description"
                autoComplete="description"
                value={inputState.description}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.description && (
                <Alert severity="warning">
                  {inputsErrorsState.description.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phone"
                label="Phone"
                id="phone"
                autoComplete="phone"
                value={inputState.phone}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.description && (
                <Alert severity="warning">
                  {inputsErrorsState.description.map((item) => (
                    <div key={"description-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid> */}
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSaveBtnClick}
                disabled={disableSaveBtn}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleCancelBtnClick}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default EditCardPage;
