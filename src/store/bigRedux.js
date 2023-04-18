import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./themeSlice";
import authReducer from "./auth";
import counterReducer from "./counter";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    counterSlice: counterReducer,
  },
});

export default store;
