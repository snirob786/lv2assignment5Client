import { createSlice } from "@reduxjs/toolkit";

type TSaleState = {
  selectedBike: null | object;
};

const initialState: TSaleState = {
  selectedBike: null,
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    setSelectedBike: (state, action) => {
      state.selectedBike = action.payload.selectedBike;
    },
  },
});

export const { setSelectedBike } = saleSlice.actions;

export default saleSlice.reducer;
