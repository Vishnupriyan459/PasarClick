// utils/tokenUtils.js

// Function to check if a token is expired
export const isTokenExpired = (token) => {
    if (!token) return true;
  
    const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT token payload
    const currentTime = Date.now() / 1000; // Current time in seconds
  
    return payload.exp < currentTime; // Check if token is expired
  };
  
  // Function to handle expired token - clears token and redirects to login page
  export const handleTokenExpiration = () => {
    const token = localStorage.getItem('access'); // Retrieve token from localStorage
  
    if (isTokenExpired(token)) {
      localStorage.removeItem('access'); // Clear expired token
      // window.location.href = '/login'; // Redirect to login page
    }
  };
  