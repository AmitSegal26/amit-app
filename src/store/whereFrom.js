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
    setPageWith(state, action) {
      state.page = action.payload;
    },
  },
});

export const prevPageActions = prevPageSlice.actions;

export default prevPageSlice.reducer;
