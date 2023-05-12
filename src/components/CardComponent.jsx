import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routers/ROUTES";
import { prevPageActions } from "../store/whereFrom";
import FavoriteIcon from "@mui/icons-material/Favorite";

const CardComponent = ({
  id,
  title,
  subTitle,
  phone,
  address,
  numOfCard,
  img,
  onDelete,
  onEdit,
  onLike,
  canEdit,
  canDelete,
  canLike,
  isLiked,
  likesArrayOfUsers,
  isTheUsersCard,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleFavBtnClick = () => {
    onLike(id);
  };
  const handleImageClick = () => {
    dispatch(prevPageActions.setPage());
    navigate(ROUTES.SPECIFICCARDPAGE + id);
  };

  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          onClick={handleImageClick}
          height="200vh"
        />
      </CardActionArea>
      {isTheUsersCard ? (
        <Typography component="h4" variant="h6" color="gold">
          Your Card &#127775;
        </Typography>
      ) : (
        <Typography component="h4" variant="h6">
          {" "}
          &#8192;
        </Typography>
      )}
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <Divider variant="middle" />
      <CardContent>
        <Typography>Phone: {phone}</Typography>
        {/* if theres a value which is undefined for some reason - make it unavailable instead of 'undefined' */}
        {address
          .split(" ")
          .find((addressType) => addressType == "undefined") ? (
          <Typography>*Address Is Not Available</Typography>
        ) : (
          <Typography>Address: {address}</Typography>
        )}
        <Typography>Business Number: {numOfCard}</Typography>
      </CardContent>
      <Divider variant="middle" />
      <CardActions sx={{ displayPrint: "flex" }}>
        <Button>
          <PhoneIcon sx={{ mr: 5, m: 2 }} color="primary" />
        </Button>
        {canLike ? (
          isLiked ? (
            <Button>
              <FavoriteIcon
                sx={{ mr: 5, m: 2 }}
                onClick={handleFavBtnClick}
                color="error"
              />
            </Button>
          ) : (
            <Button>
              <FavoriteBorderIcon
                sx={{ mr: 5, m: 2 }}
                onClick={handleFavBtnClick}
                color="error"
              />
            </Button>
          )
        ) : (
          ""
        )}
        <Typography sx={{ display: { sm: "none" } }}>
          likes:{likesArrayOfUsers.length}
        </Typography>
        {canEdit ? (
          <Button>
            <BorderColorIcon
              sx={{ mr: 5, m: 2 }}
              onClick={handleEditBtnClick}
              color="warning"
            />
          </Button>
        ) : (
          ""
        )}
        {canDelete ? (
          <Button>
            <DeleteIcon
              sx={{ mr: 5, m: 2 }}
              onClick={handleDeleteBtnClick}
              color="error"
            />
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  numOfCard: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
  canDelete: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  phone: "Phone Not Available",
  bizNumber: "Business Number Is Not Available",
  canEdit: false,
  canDelete: false,
  canLike: false,
  isTheUsersCard: false,
};

export default CardComponent;
