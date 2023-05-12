import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routers/ROUTES";
import {
  Button,
  CircularProgress,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import validateProfileParamSchema from "../../validations/profileParamEditBizSchema";
import CloseIcon from "@mui/icons-material/Close";
const ProfileDataPage = () => {
  const { id } = useParams();
  const [profileState, setProfileState] = useState(null);
  const [usersArr, setUsersArr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let joiResponse = validateProfileParamSchema({ id });
    if (joiResponse) {
      navigate(ROUTES.CRM);
      toast.error("something went wrong. try again later");
      return;
    }
    axios
      .get("/users/getAllUsers")
      .then(({ data: { users } }) => {
        let currentProfile = { ...users.find((user) => user._id == id) };
        setUsersArr(users);
        delete currentProfile._id;
        delete currentProfile.__v;
        if (!currentProfile.imageUrl) {
          currentProfile.imageUrl =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
        if (!currentProfile.imageAlt) {
          currentProfile.imageAlt =
            "This is the profile picture of " + currentProfile.firstName;
        }
        if (!currentProfile.state) {
          delete currentProfile.state;
        }
        if (!currentProfile.middleName) {
          delete currentProfile.middleName;
        }

        if (!currentProfile.zipCode || currentProfile.zipCode <= 1) {
          delete currentProfile.zipCode;
        }
        setProfileState(currentProfile);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((err) => {
        if (!err.response) {
          toast.error("something went wrong, try again later");
          return;
        }
        toast.error("ERR", err.response.data);
      });
  }, [id]);
  const handleBackToCRMClick = () => {
    navigate(ROUTES.CRM);
  };
  if (!profileState) {
    return <CircularProgress />;
  }
  let profileKeys = Object.keys(profileState);
  return (
    <Container
      sx={{ pb: 2, mt: 0.5 }}
      style={{ backgroundColor: "#000044" }}
      component="main"
      maxWidth="lg"
    >
      <Button
        onClick={handleBackToCRMClick}
        style={{
          backgroundColor: "#000044",
          color: "#fff",
          float: "right",
        }}
        variant="contained"
      >
        <CloseIcon />
      </Button>
      <h1 style={{ margin: -3 }}>Profile Details:</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <img
            src={profileState.imageUrl}
            alt={profileState.imageAlt}
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <br />
          <Grid container spacing={2}>
            {profileKeys.map((key) => (
              <Grid item xl={6} sm={12} key={key}>
                {key == "imageUrl" || key == "imageAlt" ? (
                  ""
                ) : (
                  <Fragment>
                    <Typography
                      style={{
                        backgroundColor: "#00002b",
                        color: "white",
                      }}
                      component="h5"
                      variant="h5"
                    >
                      {key == "isAdmin" || key == "biz"
                        ? profileState[key]
                          ? `${key}: yes`
                          : `${key}: not`
                        : ` ${key}: ${profileState[key]}`}
                    </Typography>
                    <Divider />
                  </Fragment>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default ProfileDataPage;
