import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {isTokenExpired} from '../utils/tokenchecker'

const API_URL = process.env.REACT_APP_API_URL;

const token = localStorage.getItem('access');
// Function to check token expiration and clear if expired
if (isTokenExpired(token)) {
  localStorage.removeItem('access'); // Remove expired token
}

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async () => {
  const res = await axios.get(`${API_URL}/users/wishlist/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

export const addToWishlist = createAsyncThunk('wishlist/add', async (productId) => {
  const res = await axios.post(
    `${API_URL}/users/wishlist/`,
    { product: productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
});

export const deleteFromWishlist = createAsyncThunk('wishlist/delete', async (id) => {
  await axios.delete(`${API_URL}/users/wishlist/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default wishlistSlice.reducer;
