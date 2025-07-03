import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tambahkan interceptor untuk token jika diperlukan
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Sesuaikan dengan cara Anda menyimpan token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
