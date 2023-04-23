import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: "/",
};
const prevPageSlice = createSlice({
  name: "prevPage",
  initialState,
  reducers: {
    setPage(state) {
      state.page = window.location.href;
    },
  },
});

export const prevPageActions = prevPageSlice.actions;

export default prevPageSlice.reducer;
