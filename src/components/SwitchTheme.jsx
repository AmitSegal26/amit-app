import { Switch, Typography, colors } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/themeSlice";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(
    (bigReduex) => bigReduex.darkThemeSlice.isDarkTheme
  );
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };
  return (
    <Typography>
      {isDark ? (
        <ModeNightIcon fontSize="large" onClick={changeTheme} />
      ) : (
        <LightModeIcon fontSize="large" onClick={changeTheme} />
      )}
    </Typography>
  );
};
export default SwitchTheme;
