import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginUser = async (email: string, password: string) => {
  try {
    const res = await api.post<{ name: string, email: string }>('/users/login', {
      email,
      password,
    });

    const { name: userName, email: userEmail } = res.data;

    await AsyncStorage.setItem('user', JSON.stringify({ name: userName, email: userEmail }));

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// const singupUser = async (email: string, password: string, name: string) => {

// }

const UserService = {
  loginUser,
};

export default UserService;