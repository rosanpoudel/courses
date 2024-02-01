import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { ReduxAction, RootState } from "../types/store.types";
import coursesSlice from "./coursesSlice";

// Combine reducers
const combinedReducer = combineReducers({ coursesData: coursesSlice });

// Define the master reducer
const masterReducer: Reducer<RootState, ReduxAction<any>> = (state, action) => {
  return combinedReducer(state, action);
};

// Create the store
export const makeStore: MakeStore<RootState | any> = () =>
  configureStore({
    reducer: masterReducer,
  });

export const reduxWrapper = createWrapper(makeStore);
