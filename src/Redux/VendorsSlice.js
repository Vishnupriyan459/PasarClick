import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching vendors and their products
// Thunk for fetching vendors and their products
export const fetchVendors = createAsyncThunk('vendors/fetchVendors', async () => {
  try {
    const response = await axios.get('/Data/vendor.json');
    return response.data.vendors; // Adjust this to the correct structure
  } catch (error) {
    throw new Error('Failed to fetch vendors: ' + error.message);
  }
});


const VendorsSlice = createSlice({
  name: 'vendors',
  initialState: {
    items: [], // Holds vendor data along with their products
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addVendor: (state, action) => {
      state.items.push(action.payload);
    },
    decreaseProductQuantity: (state, action) => {
      const vendor = state.items.find(v => v.vendorId === action.payload.vendorId);
      const product = vendor?.products.find(p => p.productId === action.payload.productId);
      if (product) {
        product.quantity -= action.payload.quantity;
      }
    },
    increaseProductQuantity: (state, action) => {
      const vendor = state.items.find(v => v.vendorId === action.payload.vendorId);
      const product = vendor?.products.find(p => p.productId === action.payload.productId);
      if (product) {
        product.quantity += action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVendors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
         // Add fetched vendors with their products to state
      })
      .addCase(fetchVendors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {addVendor, decreaseProductQuantity, increaseProductQuantity } = VendorsSlice.actions;
export default VendorsSlice.reducer;
