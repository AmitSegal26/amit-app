import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useDispatch, useSelector } from "react-redux";
import { prevPageActions } from "../store/whereFrom";
import ROUTES from "../routers/ROUTES";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let qparams = useQueryParams();
  const { payload } = useSelector((bigPie) => bigPie.authSlice);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error("server ERR", err.response.data);
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
  const handleDeleteFromInitialCardsArr = async (id) => {
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
  const handleEditFromInitialCardsArr = (id) => {
    dispatch(prevPageActions.setPage());
    navigate(`/edit/${id}`); //localhost:3000/edit/XXX
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }
  for (const item of cardsArr) {
    if (item.title == "asdas") {
    }
  }
  return (
    <Box>
      <Typography variant="h3" color="main" gutterBottom>
        Welcome! This is my website for business advertisements!
      </Typography>
      <Divider variant="middle" />
      <Typography variant="h4" color="main" gutterBottom>
        Here below you may find some of our business that thanks to them, this
        website keeps on going!
      </Typography>
      <br />
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} xl={3} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={
                item.country +
                " " +
                item.city +
                " " +
                item.street +
                " " +
                item.houseNumber
              }
              numOfCard={item.bizNumber}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              onLike={addRemoveToLikesArray}
              canEdit={payload && payload.biz && payload._id === item.user_id}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === item.user_id)
              }
              canLike={payload}
              isLiked={payload && item.likes.includes(payload._id)}
              likesArrayOfUsers={item.likes}
              isTheUsersCard={payload && payload._id === item.user_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default HomePage;
