import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('Orders/fetchOrders', async () => {
  try {
    const response = await axios.get('/Data/Ovder.json');
    return response.data.Orders; // Ensure this matches your JSON structure
  } catch (error) {
    throw new Error('Failed to fetch orders: ' + error.message);
  }
});

const OrderSlice = createSlice({
  name: 'order',
  initialState: {
    items: [], // All orders
    filteredItems: [], // Orders filtered by time period and state
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    filterOrdersByTime: (state, action) => {
      const currentDate = new Date();
      const { days } = action.payload; // Payload specifies the number of days

      state.filteredItems = state.items.filter((order) => {
        const orderDate = new Date(order.Expected_delivery_date);
        const differenceInTime = currentDate - orderDate;
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays <= days;
      });
    },
    filterOrdersByState: (state, action) => {
      const orderState = action.payload; // State could be 'All', 'Pending', 'Delivered', 'Canceled'

      if (orderState === 'All') {
        state.filteredItems = state.items; // Show all orders
      } else {
        state.filteredItems = state.items.filter((order) => order.state === orderState);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.filteredItems = action.payload; // Default to all items
        state.error = null;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterOrdersByTime, filterOrdersByState } = OrderSlice.actions;

export default OrderSlice.reducer;
