import { User } from "@/types";
import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email: string, password: string): Promise<{ token: string, user: { name: string, email: string } } | undefined> => {
  try {
    const res = await api.post<{ token: string, user: { name: string, email: string } }>('/users/login', {
      email,
      password,
    });

    const userName = res.data.user.name;
    const userEmail = res.data.user.email;
    await AsyncStorage.setItem('user', JSON.stringify({ name: userName, email: userEmail }));

    return res.data;
  } catch (err) {
    throw err;
  }
};

const register = async (email: string, password: string, name: string): Promise<User | undefined> => {
  try {
    const res = await api.post<User>('/users/register', {
      email,
      password,
      name,
    });

    const { name: userName, email: userEmail } = res.data;
    await AsyncStorage.setItem('user', JSON.stringify({ name: userName, email: userEmail }));

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