import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routers/ROUTES";
import {
  Button,
  CircularProgress,
  Divider,
  Switch,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import ProfilePageBtnsAndLinks from "../components/Profile/ProfilePageBtnsAndLinks";
import validateProfileParamSchema from "../validations/profileParamEditBizSchema";
import CloseIcon from "@mui/icons-material/Close";
const ProfileDataPage = () => {
  const { id } = useParams();
  const [isBizState, setIsBiz] = useState(false);
  const [profileState, setProfileState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    let joiResponse = validateProfileParamSchema(id);
    console.log(
      "🚀 ~ file: ProfileDataPage.jsx:20 ~ useEffect ~ joiResponse:",
      joiResponse
    );
    console.log(id);
    if (joiResponse) {
      //   navigate(ROUTES.CRM);
      toast.error("something went wrong. try again later");
      //   return;
    }
    axios
      .get("/users/getAllUsers")
      .then(({ data: { users } }) => {
        console.log(users);
        let currentProfile = { ...users.find((user) => user._id == id) };
        delete currentProfile._id;
        delete currentProfile.__v;
        currentProfile.createdAt = new Date(
          currentProfile.createdAt
        ).toLocaleDateString("hi");
        if (!currentProfile.imageUrl) {
          currentProfile.imageUrl =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
        if (!currentProfile.imageAlt) {
          currentProfile.imageAlt =
            "This is the profile picture of " + currentProfile.firstName;
        }

        if (!currentProfile.zipCode || currentProfile.zipCode <= 1) {
          delete currentProfile.zipCode;
        }
        setIsBiz(currentProfile.biz);
        setProfileState(currentProfile);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  }, [id]);
  const handleTopClick = (ev) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const handleBizChange = (ev) => {
    setIsBiz(ev.target.checked);
  };
  const handleBackToCRMClick = () => {
    navigate(ROUTES.CRM);
  };
  if (!profileState) {
    return <CircularProgress />;
  }
  let profileKeys = Object.keys(profileState);
  console.log(profileState);
  return (
    <Container
      style={{ backgroundColor: "#000044" }}
      component="main"
      maxWidth="md"
    >
      <Button onClick={handleBackToCRMClick} color="error" variant="contained">
        <CloseIcon />
      </Button>
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
                    <Typography component="h5" variant="h5">
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
          Business Account:{" "}
          <Switch checked={isBizState} onChange={handleBizChange} />
          <Button
            onClick={handleTopClick}
            color="secondary"
            variant="contained"
          >
            CLICK TO SCROLL TO TOP
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
export default ProfileDataPage;
