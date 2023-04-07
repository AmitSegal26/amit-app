import { Route, Routes } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AboutPage from "../pages/AboutPage";
import Page404 from "../pages/Page404";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={`*`} element={<Page404 />} />
    </Routes>
  );
};

export default Router;
