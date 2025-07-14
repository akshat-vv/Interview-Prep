import { createSlice } from "@reduxjs/toolkit";


const savedCart = localStorage.getItem("cartItems");

const initialState = {
   cartItems: savedCart ? JSON.parse(savedCart) : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const exists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.cartItems.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (cart) => cart.id !== action.payload
      );
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
