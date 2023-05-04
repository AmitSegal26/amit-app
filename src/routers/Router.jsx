import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import SuperProtectedRoute from "../components/SuperProtectedRoute";
import ProtectedRoute from "../components/ProtectedRoute";
import LogoutPage from "../pages/Logout";
import SandboxPage from "../sandbox/SandboxPage";
import NestedRoutePage from "../sandbox/NestedRoutePage/NestedRoutePage";
import RP1 from "../sandbox/RP1";
import RP2 from "../sandbox/RP2";
import ReRenderPage from "../sandbox/ReRenderPage/ReRenderPage";
import NestedPage1 from "../sandbox/NestedRoutePage/NestedPage1";
import NestedPage2 from "../sandbox/NestedRoutePage/NestedPage2";
import FavCardPage from "../pages/FavCardPage";
import ProfilePage from "../pages/ProfilePage";
import EditCardPage from "../pages/EditCardPage";
import CreateCardPage from "../pages/CreateCardPage";
import CardPage from "../pages/CardPage";
import MyCardsPage from "../pages/MyCardsPage";
import CRMPage from "../pages/CRMPage";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route
        path={ROUTES.REGISTER}
        element={
          <ProtectedRoute
            element={<RegisterPage />}
            supposedToBeLoggedInThis={false}
          />
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <ProtectedRoute
            element={<LoginPage />}
            supposedToBeLoggedInThis={false}
          />
        }
      />
      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPage />} isLogOut={true} />}
      />
      <Route
        path={ROUTES.FAVCARDS}
        element={<ProtectedRoute element={<FavCardPage />} />}
      />
      <Route
        path={ROUTES.SANDBOX}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandboxPage />}
          />
        }
      >
        <Route path="nr" element={<NestedRoutePage />}>
          <Route path="nestedpage1" element={<NestedPage1 />} />
          <Route path="nestedpage2" element={<NestedPage2 />} />
        </Route>
        <Route path="rerender" element={<ReRenderPage />} />
        <Route path="redux1" element={<RP1 />} />
        <Route path="redux2" element={<RP2 />} />
      </Route>
      <Route
        path={ROUTES.PROFILE}
        element={<ProtectedRoute element={<ProfilePage />} />}
      />
      <Route
        path="/edit/:id"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />
      <Route path={ROUTES.SPECIFICCARDPAGE + ":id"} element={<CardPage />} />
      <Route
        path={ROUTES.CREATE}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.CREATE2}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />
      <Route
        path={ROUTES.CRM}
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<CRMPage />}
          />
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<MyCardsPage />}
          />
        }
      />
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
};

export default Router;
