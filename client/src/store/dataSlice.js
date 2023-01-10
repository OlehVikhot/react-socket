import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "all",
  data: [],
  selected: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    loadData: (state, action) => {
      state.data = action.payload;
    },
    selectTicker: (state, action) => {
      if (state.selected.includes(action.payload)) {
        state.selected = state.selected.filter(
          (item) => item !== action.payload
        );
      } else {
        state.selected.push(action.payload);
      }
    },
    selectTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { loadData, selectTicker, selectTab } = dataSlice.actions;
export default dataSlice.reducer;
