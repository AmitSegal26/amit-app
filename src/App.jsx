import logo from "./logo.svg";
import "./App.css";
import Router from "./routers/Router";
import Navbar from "./components/Navbar";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Router />
    </Fragment>
  );
}

export default App;
