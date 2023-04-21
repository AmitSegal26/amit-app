import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useSelector } from "react-redux";
import ROUTES from "../../routers/ROUTES";
import NavLinkComponent from "./NavLinkComponent";

const HamburgerMenu = ({
  openNavMenu,
  anchorNav,
  closeNavMenu,
  allPages,
  notAuthedP,
  authedP,
  adminOrBizP,
}) => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const handleOpenNavMenu = (ev) => {
    openNavMenu(ev);
  };
  const handleCloseNavMenu = () => {
    closeNavMenu();
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
          ? authedP.map((page) => (
              <MenuItem
                key={"miniLinks" + page.url}
                onClick={handleCloseNavMenu}
              >
                <NavLinkComponent key={page.url} {...page} />
              </MenuItem>
            ))
          : notAuthedP.map((page) => (
              <MenuItem
                key={"miniLinks" + page.url}
                onClick={handleCloseNavMenu}
              >
                <NavLinkComponent key={page.url} {...page} />
              </MenuItem>
            ))}
      </Menu>
    </Box>
  );
};

export default HamburgerMenu;
