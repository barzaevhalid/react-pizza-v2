import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type sortType = {
    name: string,
    sort: string,
}
export interface FilterType   {
  selectedSort: sortType
  categoryId: number,
};

const initialState:FilterType = {
  selectedSort: {
    name: "популярности",
    sort: "rating",
  },
  categoryId: 0,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSort(state, action: PayloadAction<sortType>) {
      state.selectedSort = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setParams(state, action: PayloadAction<FilterType> ) {
      state.categoryId = Number(action.payload.categoryId);
      state.selectedSort = action.payload.selectedSort;
    },
  },
});

export const { setSort, setCategoryId, setParams } = filterSlice.actions;

export default filterSlice.reducer;
