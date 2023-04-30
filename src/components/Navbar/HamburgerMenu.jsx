import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routers/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { prevPageActions } from "../../store/whereFrom";

const HamburgerMenu = ({
  openNavMenu,
  anchorNav,
  closeNavMenu,
  allPages,
  notAuthedP,
  authedP,
  bizP,
  adminP,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const { payload } = useSelector((bigPieBigState) => bigPieBigState.authSlice);
  const handleOpenNavMenu = (ev) => {
    openNavMenu(ev);
  };
  const handleCloseNavMenu = () => {
    closeNavMenu();
  };
  const handleMyCardsClick = () => {
    dispatch(prevPageActions.setPageWith(ROUTES.MYCARDS));
  };
  const handleFavClick = () => {
    dispatch(prevPageActions.setPageWith(ROUTES.FAVCARDS));
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        flex: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {allPages.map((page) => (
          <MenuItem key={"miniLinks" + page.url} onClick={handleCloseNavMenu}>
            <NavLinkComponent key={page.url} {...page} />
          </MenuItem>
        ))}
        {isLoggedIn
          ? authedP.map((page) =>
              page.url === ROUTES.FAVCARDS ? (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={handleFavClick}
                  />
                </MenuItem>
              ) : (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLinkComponent key={page.url} {...page} />
                </MenuItem>
              )
            )
          : notAuthedP.map((page) => (
              <MenuItem
                key={"miniLinks" + page.url}
                onClick={handleCloseNavMenu}
              >
                <NavLinkComponent key={page.url} {...page} />
              </MenuItem>
            ))}
        {payload && payload.isAdmin
          ? adminP.map((page) => (
              <MenuItem
                key={"miniLinks" + page.url}
                onClick={handleCloseNavMenu}
              >
                <NavLinkComponent key={page.url} {...page} />
              </MenuItem>
            ))
          : ""}
        {payload && payload.biz
          ? bizP.map((page) =>
              page.url == ROUTES.MYCARDS ? (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLinkComponent
                    key={page.url}
                    {...page}
                    onClick={handleMyCardsClick}
                  />
                </MenuItem>
              ) : (
                <MenuItem
                  key={"miniLinks" + page.url}
                  onClick={handleCloseNavMenu}
                >
                  <NavLinkComponent key={page.url} {...page} />
                </MenuItem>
              )
            )
          : ""}
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
