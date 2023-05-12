import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
const useLoggedIn = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      await axios.get("/users/userInfo");
      const payload = jwt_decode(token);
      dispatch(authActions.login(payload));
    } catch (err) {
      if (!err.response) {
        toast.error("something went wrong, try again later");
        return;
      }
      toast.error(err.response.data);
      //server error
      //invalid token
    }
  };
};

export default useLoggedIn;
