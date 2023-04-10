import logo from "./logo.svg";
import "./App.css";
import Router from "./routers/Router";
import Navbar from "./components/Navbar";
import { Fragment } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};
function App() {
  const isDarkTheme = useSelector(
    (bigRedux) => bigRedux.darkThemeSlice.isDarkTheme
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <Navbar />
      <Router />
    </ThemeProvider>
  );
}

export default App;
