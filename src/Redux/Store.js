import { configureStore } from '@reduxjs/toolkit';
import VendorsSlice from './VendorsSlice';
import cartReducer from './CartSlice';
import OrderSlice from './OrderSlice';
import locationReducer from './locationSlice';
import wishlistReducer from './wishlistSlice';
// import {}
import { handleTokenExpiration } from '../utils/tokenchecker';
// import {thunk} from 'redux-thunk';
;
// Load cart from local storage
const loadCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

// Save cart to local storage
const saveCartToLocalStorage = (cartState) => {
  try {
    const serializedCart = JSON.stringify(cartState);
    localStorage.setItem('cart', serializedCart);
    //need to add a api

  }catch (error) {
    console.error('Could not save cart to local storage', error);
  }
};

const store = configureStore({
  reducer: {
    vendors: VendorsSlice,
    cart: cartReducer,
    order: OrderSlice,
    location: locationReducer,
    
  },
  preloadedState: {
    cart: { items: loadCartFromLocalStorage() }, // Preload cart from local storage
  },
  
});

// Sync cart with local storage on updates
store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cart.items);
});

export default store;

