// src/api.js
import axios from 'axios';

export const fetchVendors = async () => {
    try {
      const response = await axios.get('/Data/Vendor.json');
      
      // return response.data.vendors;
      return 0; // Access the array under the "vendor" key
    } catch (error) {
      console.error('Error fetching vendor data:', error);
      throw error;
    }
  };
