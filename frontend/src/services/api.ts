import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('token');
};


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;