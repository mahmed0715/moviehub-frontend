import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Dynamic URL
  withCredentials: true, // Important for sending refresh tokens (HttpOnly cookie)
});

export default instance;
