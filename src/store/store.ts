import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskR from "./taskSlice";
import modalR from "./modalSlice";

const rootReducer = combineReducers({
  task: taskR,
  modal: modalR,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
