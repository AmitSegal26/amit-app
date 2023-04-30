import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import ROUTES from "../routers/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { validateEditCardParamsSchema } from "../validations/editValidation";
import axios from "axios";
import { toast } from "react-toastify";
import atom from "../logo.svg";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { useSelector } from "react-redux";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CardPage = () => {
  const { id } = useParams();
  const [cardState, setCardState] = useState(null);
  const navigate = useNavigate();
  const { page } = useSelector((bigRedux) => bigRedux.prevPageSlice);
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
        delete newcardState._id;
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
  return (
    <Container component="main" maxWidth="xl">
      <br />
      <Grid container>
        <Grid item sm={3}>
          <Button variant="outlined" onClick={handleCancelBtnClick}>
            <FirstPageIcon />
            Back to{" "}
            {whereTo == ROUTES.MYCARDS
              ? "Your Cards"
              : whereTo == ROUTES.FAVCARDS
              ? "Your Favorite Cards"
              : "Home"}
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography align="center" component="h1" variant="h3">
          Card Page:
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 600, md: 600 },
            maxWidth: { xs: 600, md: 600 },
          }}
          alt={cardState.alt ? cardState.alt : ""}
          src={cardState.url ? cardState.url : atom}
        />
      </Box>
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
                <Grid
                  key={propOfCard}
                  item
                  sx={{ maxWidth: "15rem" }}
                  xs={12}
                  // sm={12}
                  // md={6}
                  // xl={4}
                >
                  <Typography variant="h6" gutterBottom color="white">
                    <Button color="info" variant="outlined" disabled>
                      {propOfCard}
                    </Button>{" "}
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
