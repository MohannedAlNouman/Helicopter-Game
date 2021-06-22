import {configureStore} from "@reduxjs/toolkit";

import helicopterReducer from "./helicopter/helicopter.js";

export default configureStore({
  reducer: {
    helicopter: helicopterReducer
  }
});
