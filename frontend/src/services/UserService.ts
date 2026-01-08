import { AuthResponse, User } from "@/types";
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: string, password: string): Promise<AuthResponse | undefined> => {
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
};

const register = async (email: string, password: string, name: string): Promise<User | undefined> => {
  const res = await api.post<User>('/users/register', {
    email,
    password,
    name,
  });

  return res.data;
};

const findByEmailOrName = async (emailOrName: string): Promise<User[]> => {
  const res = await api.get<User[]>(`/users/emailOrName/${emailOrName}`);
  return res.data;
};

const getMe = async (): Promise<User | undefined> => {
  const res = await api.get<User>('/users/me');
  return res.data;
};

const UserService = {
  login,
  register,
  findByEmailOrName,
  getMe,
};

export default UserService;