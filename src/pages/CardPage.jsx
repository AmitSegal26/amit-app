import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ROUTES from "../routers/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { validateEditCardParamsSchema } from "../validations/editValidation";
import axios from "axios";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import atom from "../logo.svg";
import FirstPageIcon from "@mui/icons-material/FirstPage";

const CardPage = () => {
  const { id } = useParams();
  const [cardState, setCardState] = useState(null);
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
        // delete newcardState.likes;
        delete newcardState._id;
        delete newcardState.user_id;
        // delete newcardState.bizNumber;
        // delete newcardState.createdAt;
        // delete newcardState.address;
        //.address is not acceptable by the server!
        setCardState(newcardState);
      } catch (err) {
        toast.error(err);
      }
    })();
  }, [id]);
  const handleCancelBtnClick = (ev) => {
    //move to homepage
    navigate(ROUTES.HOME);
  };

  if (!cardState) {
    return <CircularProgress />;
  }
  let cardKeys = Object.keys(cardState);
  console.log("🚀 ~ file: CardPage.jsx:71 ~ CardPage ~ cardKeys:", cardKeys);
  return (
    <Container component="main" maxWidth="xl">
      <br />
      <Grid container>
        <Grid item sm={3}>
          <Button variant="outlined" onClick={handleCancelBtnClick}>
            <FirstPageIcon />
            Back to home
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
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
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
                <Grid key={propOfCard} item xl={10}>
                  <Typography variant="h6" gutterBottom color="white">
                    <Button color="info" variant="outlined" disabled>
                      {propOfCard}
                    </Button>{" "}
                    {cardState[propOfCard]}
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
