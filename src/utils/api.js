import axios from 'axios';

const api = axios.create({
    // Use the environment variable for the base URL
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/*
  NOTE: This is a placeholder for interceptor logic.
  In a future step (session management), we will add logic here
  to automatically attach the JWT token to every request header
  if a user is logged in.
*/

export default api;