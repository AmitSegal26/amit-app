import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
} from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { prevPageActions } from "../../store/whereFrom";
import ROUTES from "../../routers/ROUTES";
import AddIcon from "@mui/icons-material/Add";
import useQueryParams from "../../hooks/useQueryParams";
import AddCardButton from "./AddCardButton";
const MyCardsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let qparams = useQueryParams();
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const [userState, setuserState] = useState("");
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error(err.response.data);
      });
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        setuserState(data);
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error(err.response.data);
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      /*
        when component loaded and states not loaded
      */
      setOriginalCardsArr(data);
      const regex = new RegExp("^\\d+$", "g");
      if (regex.test(filter)) {
        filter = +filter;
        setCardsArr(data.filter((card) => card.bizNumber.startsWith(filter)));
      } else {
        setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      }
    }
    if (originalCardsArr) {
      /*
        when all loaded and states loaded
      */
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      const regex = new RegExp("^\\d+$", "g");

      if (regex.test(filter)) {
        filter = +filter;
        setCardsArr(
          newOriginalCardsArr.filter((card) =>
            card.bizNumber.startsWith(filter)
          )
        );
      } else {
        setCardsArr(
          newOriginalCardsArr.filter((card) => card.title.startsWith(filter))
        );
      }
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);
  const addRemoveToLikesArray = async (id) => {
    try {
      let { data } = await axios.patch("/cards/card-like/" + id);
      const newCardsArr = JSON.parse(JSON.stringify(cardsArr));
      newCardsArr.map((card) => {
        if (card._id == data._id) {
          card.likes = [...data.likes];
        }
      });
      setCardsArr(newCardsArr);
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      let error = err.response.data;
      error.startsWith("card validation failed:") &&
        toast.error(
          "invalid card, cannot be added until some details are filled! sorry for the inconvenience"
        );
    }
  };
  const handleDeleteFromMyCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      toast.error(err.response.data);
    }
  };
  const handleEditFromMyCardsArr = (id) => {
    dispatch(prevPageActions.setPage());
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
            {/* {setIsLikedForIconState(
              arrOfLikesCardId.find((cardId) => cardId == card._id)
            )} */}
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
              onLike={addRemoveToLikesArray}
              canEdit={payload && payload.biz && payload._id === card.user_id}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === card.user_id)
              }
              canLike={payload}
              isLiked={payload && card.likes.includes(payload._id)}
              likesArrayOfUsers={card.likes}
            />
          </Grid>
        ))}
      </Grid>
      <AddCardButton handleCreateFunc={handleCreateBtn} />
      <br />
    </Fragment>
  );
};
export default MyCardsPage;
