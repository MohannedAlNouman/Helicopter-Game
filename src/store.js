import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import {combineReducers} from "redux";

import helicopterReducer, {helicopterEpic} from "./helicopter/helicopter.js";

const epicMiddleware = createEpicMiddleware();

//combines all epics in 1
const rootEpic = combineEpics(helicopterEpic);

//combines all reducers in 1
const reducer = combineReducers({helicopter: helicopterReducer});

const store = configureStore({
  reducer,
  middleware: [epicMiddleware, ...getDefaultMiddleware()]
});

epicMiddleware.run(rootEpic);

export default store;
