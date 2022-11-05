import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { sortType } from "./filterSlice";

type  Pizza = {
  id: string,
  count: number, 
  name: string,
  price: number, 
  sizes: number[], 
  types: number[], 
  imageUrl: string
} 

interface PizzasType  {
  pizzas:  Pizza[];
  status: string;
}
export type  SearchPizzaParams = {
  sortCategory: string;
  sortBy: sortType; 
  order: string;
  getSearch: string; 
}
export const fetchPizzas = createAsyncThunk<Pizza[],  SearchPizzaParams> (
  "pizzas/fetchPizzas",
  async (params) => {
    const { sortCategory, sortBy, order, getSearch } = params;     

       
    const { data } = await axios.get<Pizza[]>(
      `https://632c93945568d3cad888b115.mockapi.io/items?${sortCategory}&sortBy=${sortBy}&order=${order}${getSearch}`
    );
    return data;
  }
);
const initialState:PizzasType = {
  pizzas: [],
  status: "",
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setPizzas(state, action: PayloadAction<Pizza[]>) {
      state.pizzas = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = "loading";
       state.pizzas = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "errorw";
       state.pizzas = [];
    });
  }
  // extraReducers: {
  //   //@ts-ignore
  //   [fetchPizzas.pending]: (state) => {
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //       //@ts-ignore

  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.pizzas = action.payload;
  //     state.status = "fulfilled";
  //   },
  //       //@ts-ignore

  //   [fetchPizzas.rejected]: (state) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;
