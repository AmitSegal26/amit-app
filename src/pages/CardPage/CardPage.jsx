import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ROUTES from "../../routers/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { validateEditCardParamsSchema } from "../../validations/editValidation";
import axios from "axios";
import { toast } from "react-toastify";
import logoReactForCard from "../../services/logos";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CardBackButton from "./CardBackButton";
import CardTitles from "./CardTitles";
import AlertDialog from "../../components/DialogComponent";
const CardPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardState, setCardState] = useState(null);
  const [bizNumberState, setBizNumberState] = useState(null);
  const { page } = useSelector((bigRedux) => bigRedux.prevPageSlice);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  let whereTo = ROUTES.HOME;
  const regex = new RegExp(
    "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})",
    "gi"
  );
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
      } catch (err) {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error(err.response.data);
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
  //* BONUS - let the admin change the business number
  const handleSaveBizChanges = async () => {
    try {
      await axios.patch("/cards/bizNumber/" + cardState._id);
      //  this command was in order to update the state.
      //! there's a bug at the server which returns the same card without changes
      //!after patching the new bizNumber
      let { data: relavantCard } = await axios.get(
        "/cards/card/" + cardState._id
      );
      setBizNumberState(relavantCard.bizNumber);
    } catch (err) {
      toast.error(
        "there was an error changing the bizNumber, try again later."
      );
    }
  };
  return (
    <Container component="main" maxWidth="xl">
      <br />
      <CardBackButton whereToVar={whereTo} onBackClick={handleCancelBtnClick} />
      <CardTitles cardStateProp={cardState} atomProp={logoReactForCard} />
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
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary" }}
                  >
                    {propOfCard === "_id" ? (
                      ""
                    ) : (
                      <Button color="info" variant="outlined" disabled>
                        {propOfCard}
                      </Button>
                    )}{" "}
                    {propOfCard == "web" ? (
                      regex.test(cardState.web) ? (
                        <Link
                          href={cardState.web}
                          underline="hover"
                          target="_blank"
                        >
                          {cardState.web}
                        </Link>
                      ) : (
                        <Fragment>
                          {cardState.web}
                          <span style={{ color: "red" }}>
                            <br /> [Auto-Link was not available for this
                            address]
                          </span>
                        </Fragment>
                      )
                    ) : propOfCard == "likes" ? (
                      <Fragment>
                        {cardState.likes.length}
                        <FavoriteBorderIcon sx={{ ml: 1 }} color="error" />
                      </Fragment>
                    ) : propOfCard == "bizNumber" &&
                      payload &&
                      payload.isAdmin ? (
                      <Fragment>
                        {bizNumberState ? bizNumberState : cardState.bizNumber}
                        <AlertDialog
                          onBtnChangeBizNumberClick={handleSaveBizChanges}
                          buttonText="Edit The Business Number"
                          questionHead="Are you sure you want to change the BIZNUMBER of this card?"
                          questionBody="Changing the Business Number of this card is permanent. After
                          Clicking 'Change' the previous Business Number will be lost forever"
                          acceptText="Change"
                        />
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
