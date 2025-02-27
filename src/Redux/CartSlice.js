import { createSlice } from '@reduxjs/toolkit';
import { decreaseProductQuantity, increaseProductQuantity } from './VendorsSlice'; // Import product actions

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Holds cart items {vendorId, productId, productName, price, quantity, ...}
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.items.find((item) => 
        item.productId === action.payload.productId && item.vendorId === action.payload.vendorId
      );

      if (itemInCart) {
        itemInCart.quantity += action.payload.quantity;
        console.log(action.payload.quantity, "payload.quantity");
        
         // If item already exists, increase quantity
      } else {
        state.items.push({ ...action.payload }); // Add new item to cart
      }
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex((item) => 
        item.productId === action.payload.productId && item.vendorId === action.payload.vendorId
      );
      if (index !== -1) {
        state.items.splice(index, 1); // Remove item from cart
      }
    },
    updateQuantity: (state, action) => {
      const itemInCart = state.items.find((item) => 
        item.productId === action.payload.productId && item.vendorId === action.payload.vendorId
      );
      if (itemInCart) {
        itemInCart.quantity = action.payload.quantity; // Update quantity
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;

// Thunks to connect cart and product quantity
export const addProductToCart = (product) => (dispatch) => {
  dispatch(addToCart(product));
  dispatch(decreaseProductQuantity({ productId: product.productId, vendorId: product.vendorId, quantity: product.quantity}));
};

export const removeProductFromCart = (product) => (dispatch) => {
  dispatch(removeFromCart(product));
  dispatch(increaseProductQuantity({ productId: product.productId, vendorId: product.vendorId, quantity: 1 }));
};
