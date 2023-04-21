import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import { Fragment } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const CardComponent = ({
  img,
  title,
  subTitle,
  description,
  id,
  onDelete,
  onEdit,
  canEdit,
  canDelete,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleFavBtnClick = () => {
    onEdit(id);
  };
  const checkIfOwnsCard = async () => {
    try {
      let doesOwnOrNotCard = [];
      let { data } = await axios.get("/cards/my-cards");
      console.log("adas", data);
      for (const card of data) {
        console.log(card);
      }
    } catch (err) {
      toast.error(err);
    }
  };
  // checkIfOwnsCard();
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia component="img" image={img} />
      </CardActionArea>
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
      <CardActions sx={{ displayPrint: "flex" }}>
        <Button>
          <PhoneIcon sx={{ mr: 5, m: 2 }} color="primary" />
        </Button>
        <Button>
          <FavoriteBorderIcon
            sx={{ mr: 5, m: 2 }}
            onClick={handleFavBtnClick}
            color="error"
          />
        </Button>
        {canEdit ? (
          <Fragment>
            <Button>
              <BorderColorIcon
                sx={{ mr: 5, m: 2 }}
                onClick={handleEditBtnClick}
                color="warning"
              />
            </Button>
          </Fragment>
        ) : (
          ""
        )}
        {canDelete ? (
          <Fragment>
            <Button>
              <DeleteIcon
                sx={{ mr: 5, m: 2 }}
                onClick={handleDeleteBtnClick}
                color="error"
              />
            </Button>
          </Fragment>
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
  description: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};

CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
};

export default CardComponent;
