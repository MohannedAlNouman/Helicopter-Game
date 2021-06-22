import {createSlice} from "@reduxjs/toolkit";

export const helicopterSlice = createSlice({
  name: "helicopter",
  initialState: {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    accPercent: 0,
    accMax: 0
  },
  reducers: {
    increment: state => {
      state.x += 1;
    }
  }
});

// Action creators are generated for each case reducer function
export const {increment} = helicopterSlice.actions;

export default helicopterSlice.reducer;
