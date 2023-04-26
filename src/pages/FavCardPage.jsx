import { CircularProgress, Divider, Grid } from "@mui/material";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routers/ROUTES";
import CardComponent from "../components/CardComponent";
import { useDispatch, useSelector } from "react-redux";
// import { addToLikesArray } from "../services/addToLikes";
import { toast } from "react-toastify";
import { prevPageActions } from "../store/whereFrom";

const FavCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likedCardsArrState, setLikedCardsArrState] = useState(null);
  const [originalLikedCardsArrState, setOriginalLikedCardsArrState] =
    useState(null);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  // let arrOfCardLiked = [];
  useEffect(() => {
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        setOriginalLikedCardsArrState(data);
        setLikedCardsArrState(data);
        console.log("GOOD", data);
      })
      .catch((err) => {
        console.log("ERR" + err.response.data);
      });
  }, []);
  useEffect(() => {
    console.log("here");
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        setLikedCardsArrState(data);
      })
      .catch((err) => {
        console.log("ERR" + err.response.data);
      });
  }, [originalLikedCardsArrState]);
  const addRemoveToLikesArray = async (id) => {
    try {
      let { data } = await axios.patch("/cards/card-like/" + id);
      const newCardsArr = JSON.parse(JSON.stringify(likedCardsArrState));
      newCardsArr.map((card) => {
        if (card._id == data._id) {
          card.likes = [...data.likes];
        }
      });
      setLikedCardsArrState(newCardsArr);
      setOriginalLikedCardsArrState(newCardsArr);
    } catch (err) {
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
      setLikedCardsArrState((newCardsArr) =>
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
  if (!likedCardsArrState) {
    return <CircularProgress />;
  }
  if (likedCardsArrState.length == 0) {
    return (
      <Fragment>
        <h1>No Liked Cards Yet!</h1>
        <h2>
          you can click <Link to={ROUTES.HOME}>here</Link> in order to view the
          cards in the home page
        </h2>
      </Fragment>
    );
  }
  return (
    <Fragment>
      <h1>Favorites Page</h1>
      <h2>Here you can find your liked business cards and manage</h2>
      <Divider variant="middle" />
      <br />
      <Grid container spacing={2}>
        {likedCardsArrState.map((card) => (
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
              onLike={addRemoveToLikesArray}
              canEdit={payload && payload.biz && payload._id === card.user_id}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === card.user_id)
              }
              canLike={payload && !payload.biz && !payload.isAdmin}
              isLiked={payload && card.likes.includes(payload._id)}
              likesArrayOfUsers={card.likes}
            />
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};

export default FavCardPage;
