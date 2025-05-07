import axios from 'axios';

// Helper function to get the token
const getToken = () => {
  return localStorage.getItem('access');
};

// Utility function to check if the token is expired
export const isTokenExpired = (token) => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token payload
  const currentTime = Date.now() / 1000; // Current time in seconds

  return payload.exp < currentTime; // Check if token is expired
};

// Function to handle API requests (POST, DELETE, GET, etc.)
const apiRequest = async (url, method, data = null) => {
  const token = getToken();

  if (isTokenExpired(token)) {
    localStorage.removeItem('access');
    window.location.href = '/login'; // Redirect to login page
    return; // Exit if token is expired
  }

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    let response;
    switch (method) {
      case 'POST':
        response = await axios.post(url, data, config);
        break;
      case 'DELETE':
        response = await axios.delete(url, { ...config, data });
        break;
      case 'GET':
        response = await axios.get(url, config);
        break;
      default:
        throw new Error('Unsupported method');
    }

    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    return null;
  }
};

export default apiRequest;
