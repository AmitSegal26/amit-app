import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CardComponent from "../components/CardComponent";
import { prevPageActions } from "../store/whereFrom";
import ROUTES from "../routers/ROUTES";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const MyCardsPage = () => {
  const [cardsArr, setCardsArr] = useState(null);
  const [userState, setuserState] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        setuserState(data);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }, []);

  const handleDeleteFromMyCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleEditFromMyCardsArr = (id) => {
    dispatch(prevPageActions.setPage(ROUTES.MYCARDS));
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };
  const handleCreateBtn = () => {
    dispatch(prevPageActions.setPage());
    navigate(ROUTES.CREATE);
  };
  if (!cardsArr || !userState) {
    return <CircularProgress />;
  }
  if (cardsArr.length == 0) {
    return (
      <Container>
        <h1>No Cards Available!</h1>
        <h2>Click the button below to create your first card!</h2>
        <Button
          variant="outlined"
          onClick={handleCreateBtn}
          endIcon={<AddIcon />}
        >
          Create
        </Button>
      </Container>
    );
  }

  return (
    <Fragment>
      <h1>
        {userState.firstName} {userState.firstName}'s Cards!
      </h1>
      <h2>Here you can find the cards that were created by you!</h2>
      <h3>You have full control over them.</h3>
      <Grid container spacing={2}>
        {cardsArr.map((card) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={card._id + Date.now()}>
            <CardComponent
              id={card._id}
              title={card.title}
              subTitle={card.subTitle}
              phone={card.phone}
              address={
                card.country +
                " " +
                card.city +
                " " +
                card.street +
                " " +
                card.houseNumber
              }
              numOfCard={card.bizNumber}
              img={card.image ? card.image.url : ""}
              onDelete={handleDeleteFromMyCardsArr}
              onEdit={handleEditFromMyCardsArr}
              canEdit={payload && payload.biz && payload._id === card.user_id}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === card.user_id)
              }
              canLike={payload && !payload.biz && !payload.isAdmin}
            />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={9} />
        <Grid item xs={3}>
          <AddCircleIcon
            onClick={handleCreateBtn}
            color="primary"
            style={{ width: "6rem", height: "6rem", cursor: "pointer" }}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default MyCardsPage;
