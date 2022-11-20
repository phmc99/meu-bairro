import axios from 'axios';

const api = axios.create({
  // eslint-disable-next-line comma-dangle
  baseURL: 'http://localhost:3000'
});

export default api;
