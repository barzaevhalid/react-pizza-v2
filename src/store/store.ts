import { configureStore } from "@reduxjs/toolkit";
import pizzasSlice from "./pizzasSlice";
import filterSlice from "./filterSlice";
import cartSlice from "./cartSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    pizzasSlice,
    filterSlice,
    cartSlice,
  },
});
export type RootState = ReturnType<typeof  store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useAppDispatch: () => AppDispatch = useDispatch 