import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";

import SwitchTheme from "../SwitchTheme";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routers/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import HamburgerMenu from "./HamburgerMenu";
import ProfileComponent from "./ProfileComponent";
import { MenuItem } from "@mui/material";

// access to all
const pages = [
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];

//not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];

//logged in users
const authedPages = [
  {
    label: "FAV CARDS ❤",
    url: ROUTES.FAVCARDS,
  },
];
const avatarPages = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];

//iz pages
const bizPages = [
  {
    label: "My Cards",
    url: ROUTES.MYCARDS,
  },
  {
    label: "Create New Card",
    url: ROUTES.CREATE,
  },
];

//admin pages
const adminPages = [
  {
    label: "Sandbox",
    url: ROUTES.SANDBOX,
  },
];

const Navbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const { payload } = useSelector((bigPieBigState) => bigPieBigState.authSlice);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Link to={ROUTES.HOME}>
            <AdbIcon sx={{ color: "white" }} />
          </Link>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {payload && payload.isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {payload && payload.biz
              ? bizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
          </Box>
          <SearchPartial />
          <SwitchTheme />

          {/* hamburger with menu */}
          <HamburgerMenu
            openNavMenu={handleOpenNavMenu}
            anchorNav={anchorElNav}
            closeNavMenu={handleCloseNavMenu}
            allPages={pages}
            notAuthedP={notAuthPages}
            authedP={authedPages}
            bizP={bizPages}
            adminP={adminPages}
          />
          {isLoggedIn && (
            <ProfileComponent
              profilePages={avatarPages}
              logoutClickProp={logoutClick}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
