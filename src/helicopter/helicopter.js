import {createSlice} from "@reduxjs/toolkit";
import {tap, throttleTime, map, switchMap} from "rxjs/operators";

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
    userInput: (state, action) => {
      if (action.payload.x >= 670) {
        state.x = 670;
        state.speedX = 0;
      } else if (action.payload.x <= 0) {
        state.x = 0;
        state.speedX = 0;
      } else {
        state.x = action.payload.x;
      }
      if (action.payload.y >= 670) {
        state.y = 670;
        state.speedY = -0.01;
      } else if (action.payload.y <= 0) {
        state.y = 0;
        state.speedY = 0.01;
      } else {
        state.y = action.payload.y;
        state.speedY = action.payload.speedY;
      }
    },
    steerLeft: state => {
      if (state.speedX <= -5) {
        state.speedX = -5;
      } else {
        state.speedX -= 1;
      }
    },
    steerRight: state => {
      if (state.speedX >= 5) {
        state.speedX = 5;
      } else {
        state.speedX += 1;
      }
    },
    throttleUp: state => {
      if (state.throttlePercent >= 100) {
        state.throttlePercent = 100;
      } else {
        state.throttlePercent += 3;
      }
    },
    throttleDown: state => {
      if (state.throttlePercent <= 0) {
        state.throttlePercent = 0;
      } else {
        state.throttlePercent -= 3;
      }
    }
  }
});

export const {
  userInput,
  steerLeft,
  steerRight,
  throttleUp,
  throttleDown
} = helicopterSlice.actions;

const selectX = state => state.helicopter.x;
const selectY = state => state.helicopter.y;
const selectSpeedX = state => state.helicopter.speedX;
const selectSpeedY = state => state.helicopter.speedY;
const selectThrottlePercent = state => state.helicopter.throttlePercent;

export {selectX, selectY, selectSpeedX, selectSpeedY, selectThrottlePercent};

export const helicopterEpic = action$ => {
  return action$.pipe(
    // tap(a => {
    //   console.log(a);
    // }),
    map(a => {
      if (a.payload) {
        if (a.payload.direction === "up") {
          a = throttleUp();
        } else if (a.payload.direction === "down") {
          a = throttleDown();
        } else if (a.payload.direction === "right") {
          a = steerRight();
        } else if (a.payload.direction === "left") {
          a = steerLeft();
        }
      }
      return a;
    }),
    throttleTime(1)
  );
};

export default helicopterSlice.reducer;
