import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ROUTES from "../routers/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { validateEditCardParamsSchema } from "../validations/editValidation";
import axios from "axios";
import { toast } from "react-toastify";
import atom from "../logo.svg";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import CardBackButton from "../components/CardPage/CardBackButton";
import CardTitles from "../components/CardPage/CardTitles";
const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardState, setCardState] = useState(null);
  const [disableEditBizNumber, setDisableEditBizNumber] = useState(true);
  const [bizNumberState, setBizNumberState] = useState(null);
  const { page } = useSelector((bigRedux) => bigRedux.prevPageSlice);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  let whereTo = ROUTES.HOME;
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
        let newcardState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newcardState.url = data.image.url;
        } else {
          newcardState.url = "";
        }
        if (data.image && data.image.alt) {
          newcardState.alt = data.image.alt;
        } else {
          newcardState.alt = "";
        }

        delete newcardState.image;
        delete newcardState.__v;
        delete newcardState.user_id;

        if (!newcardState.zipCode || newcardState.zipCode <= 1) {
          delete newcardState.zipCode;
        }
        !newcardState.web && delete newcardState.web;
        !newcardState.state && delete newcardState.state;
        //* parsing to israeli date
        newcardState.createdAt = new Date(
          newcardState.createdAt
        ).toLocaleDateString("hi");
        setCardState(newcardState);
        setBizNumberState(newcardState.bizNumber);
        console.log("DONE BOSS: " + newcardState.bizNumber);
        console.log("DONE BOSS: " + bizNumberState);
      } catch (err) {
        toast.error(err);
      }
    })();
  }, [id]);

  if (page && page.endsWith("/mycards")) {
    whereTo = ROUTES.MYCARDS;
  }
  if (page && page.endsWith("/favorites")) {
    whereTo = ROUTES.FAVCARDS;
  }
  const handleCancelBtnClick = (ev) => {
    //move to homepage/my cards page
    navigate(whereTo);
  };

  if (!cardState) {
    return <CircularProgress />;
  }
  let cardKeys = Object.keys(cardState);
  const handleEditBizField = () => {
    setDisableEditBizNumber(!disableEditBizNumber);
  };
  const handleBizInputChange = (ev) => {
    let newInputState = bizNumberState;
    const regex = new RegExp("^\\d+$", "g");
    if (!regex.test(ev.target.value)) {
      toast.error("can only type numbers! between 1M-10M");
      ev.target.value = bizNumberState;
      return;
    }
    newInputState = +ev.target.value;
    setBizNumberState(newInputState);
  };
  const handleSaveBizChanges = async () => {
    try {
      let { data } = await axios.put(
        "/cards/bizNumber/" + cardState._id,
        bizNumberState
      );
      console.log("data", data);
    } catch (err) {
      console.log("ERR", err.response.data);
    }
  };
  return (
    <Container component="main" maxWidth="xl">
      <br />
      <CardBackButton whereToVar={whereTo} onBackClick={handleCancelBtnClick} />
      <CardTitles cardStateProp={cardState} atomProp={atom} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* the ternary condition is for keeping the image url and alt outside the view of the user,
             but without deleting them as a property so the image will not be damaged*/}
            {cardKeys.map((propOfCard) =>
              propOfCard !== "url" && propOfCard !== "alt" ? (
                <Grid key={propOfCard} item sx={{ maxWidth: "15rem" }} xs={12}>
                  <Typography variant="h6" gutterBottom color="white">
                    {propOfCard === "_id" ? (
                      ""
                    ) : (
                      <Button color="info" variant="outlined" disabled>
                        {propOfCard}
                      </Button>
                    )}{" "}
                    {propOfCard == "web" ? (
                      <Link
                        href={cardState.web}
                        underline="hover"
                        target="_blank"
                      >
                        {cardState.web}
                      </Link>
                    ) : propOfCard == "likes" ? (
                      <Fragment>
                        {cardState.likes.length}
                        <FavoriteBorderIcon sx={{ ml: 1 }} color="error" />
                      </Fragment>
                    ) : propOfCard == "bizNumber" &&
                      payload &&
                      payload.isAdmin ? (
                      <Fragment>
                        <TextField
                          value={bizNumberState}
                          onChange={handleBizInputChange}
                          disabled={disableEditBizNumber}
                          variant="standard"
                          InputProps={{
                            disableUnderline: disableEditBizNumber,
                          }}
                        />
                        {disableEditBizNumber ? (
                          <Button color="warning" onClick={handleEditBizField}>
                            <EditIcon sx={{ ml: 1 }} color="warning" />
                            Edit Biz Number
                          </Button>
                        ) : (
                          <Button color="error" onClick={handleEditBizField}>
                            <CancelIcon sx={{ ml: 1 }} color="error" />
                            Cancel
                          </Button>
                        )}
                        {!disableEditBizNumber ? (
                          <Button
                            color="success"
                            onClick={handleSaveBizChanges}
                          >
                            <DoneOutlineIcon sx={{ ml: 1 }} color="success" />
                            Save Changes
                          </Button>
                        ) : (
                          ""
                        )}
                      </Fragment>
                    ) : propOfCard == "_id" ? (
                      ""
                    ) : (
                      cardState[propOfCard]
                    )}
                  </Typography>
                </Grid>
              ) : (
                ""
              )
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CardPage;
