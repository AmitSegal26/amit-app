import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "@mui/material";

import ROUTES from "../routers/ROUTES";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element, supposedToBeLoggedInThis, isLogOut }) => {
  //* logic section
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  //* html section
  if (supposedToBeLoggedInThis) {
    //protectd for loggen in users
    if (isLoggedIn) {
      return element;
    } else {
      if (!isLogOut) {
        //is not the log out component
        toast.error("only for logged users. log in first!");
      } else {
        toast.warning("you cannot log out if you are not logged in.");
      }
      return <Navigate to={ROUTES.HOME} />;
    }
  } else {
    //protected for new users or not logged in uesrs
    if (!isLoggedIn) {
      return element;
    } else {
      toast.error("already logged in and registered. log out first!");
      return <Navigate to={ROUTES.HOME} />;
    }
  }
};
ProtectedRoute.defaultProps = {
  supposedToBeLoggedInThis: true,
  isLogOut: false,
};

export default ProtectedRoute;
