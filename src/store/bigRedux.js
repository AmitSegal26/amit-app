import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./themeSlice";
import authReducer from "./auth";
import counterReducer from "./counter";
import prevPageReducer from "./whereFrom";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    counterSlice: counterReducer,
    prevPageSlice: prevPageReducer,
  },
});

export default store;
