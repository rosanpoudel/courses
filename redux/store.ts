import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import coursesSlice from "./coursesSlice";

const combinedReducer = combineReducers({ coursesData: coursesSlice });

const masterReducer = (state: any, { type, payload }: any) => {
  return combinedReducer(state, { type, payload });
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
  });

export const reduxWrapper = createWrapper(makeStore);
