import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type  pizzaItem = {
    id: string,
    count: number, 
    name: string,
    price: number, 
    sizes: number, 
    types: string, 
    imageUrl: string
} 
interface CartSliceState {
  totalPrice: number;
  pizzaItems: pizzaItem[]
}
const initialState: CartSliceState = {
  totalPrice: 0,
  pizzaItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addPizza(state, action: PayloadAction<pizzaItem>) {
      const item = state.pizzaItems.find((obj) => obj.id === action.payload.id);
      if (item) {
        item.count++;
      } else {
        state.pizzaItems.push(action.payload);
      }
      state.totalPrice = state.pizzaItems.reduce((sum, obj) => {
        console.log(sum);
        return obj.price * obj.count + sum;
      }, 0);
    },
    increment(state, action: PayloadAction<string>) {
      const item = state.pizzaItems.find((obj) => obj.id === action.payload);
      if (item) {
        item.count++;
      }
      state.totalPrice = state.pizzaItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    decrement(state, action: PayloadAction<string>) {
      const item = state.pizzaItems.find((obj) => obj.id === action.payload);
      if(item) {
        if (item) {
          item.count--;
        }
        if (item.count <= 0) {
          state.pizzaItems = state.pizzaItems.filter((obj) => obj.id !== action.payload);
        }
        state.totalPrice = state.pizzaItems.reduce((sum, obj) => {
          console.log(sum);
          return obj.price * obj.count + sum;
        }, 0);
      }
    },

    removePizza(state, action: PayloadAction<string>) {
      state.pizzaItems = state.pizzaItems.filter(
        (obj) => obj.id !== action.payload
      );
    },
    clearCart(state) {
      state.pizzaItems = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPizza, clearCart, decrement, increment, removePizza } =
  cartSlice.actions;

export default cartSlice.reducer;
