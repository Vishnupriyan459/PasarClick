import axios from 'axios';

// Fetch products from the API
export const fetchProducts = async () => {
  try {
    const response = await axios.get('/Data/products.json');
    return response.data.products; // Access the array under the "products" key
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};
