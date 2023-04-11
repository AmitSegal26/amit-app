import logo from "./logo.svg";
import "./App.css";
import Router from "./routers/Router";
import Navbar from "./components/Navbar";
import { Fragment } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

//redux
import { useSelector } from "react-redux";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <header>
        <Navbar />
      </header>
      <main>
        <Router />
      </main>

      <footer></footer>
    </ThemeProvider>
  );
}

export default App;
