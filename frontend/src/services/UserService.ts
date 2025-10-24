import { AuthResponse, User } from "@/types";
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: string, password: string): Promise<AuthResponse | undefined> => {
  try {
    const res = await api.post<AuthResponse>('/users/login', {
      email,
      password,
    });

    const authResponse = res.data;
    await AsyncStorage.setItem('user', JSON.stringify({
      id: authResponse.user.id,
      name: authResponse.user.name,
      email: authResponse.user.email,
    }));

    return res.data;
  } catch (err) {
    throw err;
  }
};

const register = async (email: string, password: string, name: string): Promise<AuthResponse | undefined> => {
  try {
    const res = await api.post<AuthResponse>('/users/register', {
      email,
      password,
      name,
    });

    const authResponse = res.data;
    await AsyncStorage.setItem('user', JSON.stringify({
      id: authResponse.user.id,
      name: authResponse.user.name,
      email: authResponse.user.email,
    }));

    return res.data;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

const UserService = {
  login,
  register,
};

export default UserService;