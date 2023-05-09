import {
  BottomNavigation,
  Box,
  Container,
  Divider,
  Paper,
  Typography,
} from "@mui/material";
import React, { Fragment } from "react";
import NavLinkComponent from "./Navbar/NavLinkComponent";
import ROUTES from "../routers/ROUTES";
import { authActions } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";

const Footer = () => {
  const dispatch = useDispatch();
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
  const { isLoggedIn } = useSelector((bigRedux) => bigRedux.authSlice);
  const { payload } = useSelector((bigRedux) => bigRedux.authSlice);
  return (
    <Container
      maxWidth="xl"
      component={Paper}
      sx={{
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        border: 1,
      }}
    >
      {isLoggedIn ? (
        //logged in
        <Fragment>
          <Typography
            component="h2"
            variant="h5"
            sx={{ color: "primary", fontWeight: "bold" }}
          >
            Amit's Creation © , 2023
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <NavLinkComponent {...{ label: "Home Page", url: ROUTES.HOME }} />
            </Box>
            <Divider orientation="vertical" />
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <NavLinkComponent
                {...{ label: "Profile Page", url: ROUTES.PROFILE }}
              />
            </Box>
            {payload && payload.isAdmin ? (
              <Fragment>
                <Divider orientation="vertical" />
                <Box
                  component={"div"}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <NavLinkComponent
                    {...{ label: "CRM System", url: ROUTES.CRM }}
                  />
                </Box>
              </Fragment>
            ) : (
              ""
            )}

            <Divider orientation="vertical" />
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", flexBasis: 1 }}
            >
              <NavLinkComponent
                {...{ label: "Logout", url: ROUTES.LOGOUT }}
                onClick={logoutClick}
              />
            </Box>
          </Box>
        </Fragment>
      ) : (
        //logged out
        <Fragment>
          <Typography
            component="h2"
            variant="h5"
            sx={{ color: "primary", fontWeight: "bold" }}
          >
            Amit's Creation © , 2023
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <NavLinkComponent {...{ label: "Home Page", url: ROUTES.HOME }} />
            </Box>

            <Divider orientation="vertical" />
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <NavLinkComponent {...{ label: "About Us", url: ROUTES.ABOUT }} />
            </Box>
            <Divider orientation="vertical" />
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <NavLinkComponent
                {...{ label: "Register", url: ROUTES.REGISTER }}
              />
            </Box>
            <Divider orientation="vertical" />
            <Box
              component={"div"}
              sx={{ display: "flex", flexDirection: "column", flexBasis: 1 }}
            >
              <NavLinkComponent {...{ label: "Login", url: ROUTES.LOGIN }} />
            </Box>
          </Box>
        </Fragment>
      )}
    </Container>
  );
};

export default Footer;
