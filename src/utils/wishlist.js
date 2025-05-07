import apiRequest from './api';
const API_URL = process.env.REACT_APP_API_URL;
// Function to fetch wishlist
export const fetchWishlist = async () => {
  return await apiRequest(`${API_URL}/users/wishlist/`, 'GET');
};

// Function to add item to wishlist
export const addToWishlist = async (productId) => {
  return await apiRequest(`${API_URL}/users/wishlist/`, 'POST', { product: productId });
};

// Function to delete item from wishlist
export const deleteFromWishlist = async (productId) => {
  return await apiRequest(`${API_URL}/users/wishlist/${productId}/`, 'DELETE');
};
