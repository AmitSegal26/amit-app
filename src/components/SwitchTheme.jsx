import { Switch, Typography, colors } from "@mui/material";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/themeSlice";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { toast } from "react-toastify";

const SwitchTheme = () => {
  const dispatch = useDispatch();
  const isDark = useSelector(
    (bigReduex) => bigReduex.darkThemeSlice.isDarkTheme
  );
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
    toast.success("YES");
  };
  return (
    <Typography>
      {isDark ? (
        <ModeNightIcon onClick={changeTheme} />
      ) : (
        <LightModeIcon onClick={changeTheme} />
      )}
    </Typography>
  );
};
export default SwitchTheme;
