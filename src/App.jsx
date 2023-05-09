import "./App.css";
import Router from "./routers/Router";
import Navbar from "./components/Navbar/Navbar";
import useLoggedIn from "./hooks/useLoggedIn";
import { useEffect, useState } from "react";

//MUI
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";

//toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";

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
  const [isLoading, setIsLoading] = useState(true);
  const loggedIn = useLoggedIn();
  useEffect(() => {
    (async () => {
      await loggedIn();
      setIsLoading(false);
    })();
  }, []);
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
      <br />
      <br />
      <br />
      <br />
      <main>{isLoading ? <CircularProgress /> : <Router />}</main>

      <footer>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </footer>
    </ThemeProvider>
  );
}

export default App;
