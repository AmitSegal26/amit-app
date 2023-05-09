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
import { prevPageActions } from "../../store/whereFrom";

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
];

//admin pages
const adminPages = [
  {
    label: "Sandbox",
    url: ROUTES.SANDBOX,
  },
  {
    label: "CRM System",
    url: ROUTES.CRM,
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
  const handleLogoClick = () => {
    dispatch(prevPageActions.setPageWith(ROUTES.HOME));
  };
  const handleMyCardsClick = () => {
    dispatch(prevPageActions.setPageWith(ROUTES.MYCARDS));
  };
  const handleFavClick = () => {
    dispatch(prevPageActions.setPageWith(ROUTES.FAVCARDS));
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar>
          <Link to={ROUTES.HOME}>
            <AdbIcon sx={{ color: "white" }} onClick={handleLogoClick} />
          </Link>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {payload && payload.isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {payload && payload.biz
              ? bizPages.map((page) =>
                  page.url == ROUTES.MYCARDS ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={handleMyCardsClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : ""}
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.FAVCARDS ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={handleFavClick}
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
