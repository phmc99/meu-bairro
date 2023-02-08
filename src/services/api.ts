import axios from 'axios';

const api = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
});

export default api;
