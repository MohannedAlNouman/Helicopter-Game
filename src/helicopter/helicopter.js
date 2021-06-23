import {createSlice} from "@reduxjs/toolkit";

export const helicopterSlice = createSlice({
  name: "helicopter",
  initialState: {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0,
    throttlePercent: 0
  },
  reducers: {
    steerLeft: state => {
      state.x -= 1;
    },
    steerRight: state => {
      state.x += 1;
    },
    throttleUp: state => {
      state.throttlePercent += 1;
    },
    throttleDown: state => {
      state.throttlePercent -= 1;
    }
  }
});

export const {
  steerLeft,
  steerRight,
  throttleUp,
  throttleDown
} = helicopterSlice.actions;

const selectX = state => state.x;
const selectY = state => state.y;
const selectSpeedX = state => state.speedX;
const selectSpeedY = state => state.speedY;
const selectThrottlePercent = state => state.throttlePercent;

export {selectX, selectY, selectSpeedX, selectSpeedY, selectThrottlePercent};

export default helicopterSlice.reducer;
