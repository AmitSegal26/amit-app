import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./themeSlice";
// import authReducer from "./auth";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    // authSlice: authReducer,
  },
});

export default store;
