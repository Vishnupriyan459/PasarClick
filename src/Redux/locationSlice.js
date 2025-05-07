// redux/slices/locationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    country: '',
    currency: 'USD',
  },
  reducers: {
    setLocationData: (state, action) => {
      state.country = action.payload.country;
      state.currency = action.payload.currency;
      state.city=action.payload.city;
    },
    setCurrencyManually: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { setLocationData, setCurrencyManually } = locationSlice.actions;
export default locationSlice.reducer;
