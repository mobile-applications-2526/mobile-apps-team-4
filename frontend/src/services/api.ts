import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const token = await SecureStore.getItemAsync('token');
    console.log('using token:', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('--- Axios Request ---');
    console.log('URL:', config.baseURL + config.url);
    console.log('Method:', config.method);
    console.log('Headers:', config.headers);
    console.log('Data:', config.data);
    console.log('--------------------');
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;