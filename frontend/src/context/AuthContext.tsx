import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthResponse, User } from '@/types';

type AuthContextType = {
  authState?: { token: string | null; authenticated: boolean | null };
  user?: User;
  onLogin?: (authResponse: AuthResponse) => Promise<void>;
  onLogout?: () => Promise<void>;
  loadSession?: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean | null }>({
    token: null,
    authenticated: null,
  });
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      const userData = await AsyncStorage.getItem('user');
      
      if (token && userData) {
        setAuthState({ token, authenticated: true });
        setUser(JSON.parse(userData));
      } else {
        setAuthState({ token: null, authenticated: false });
        setUser(undefined);
      }
    } catch (error) {
      console.error('Failed to load session', error);
      setAuthState({ token: null, authenticated: false });
      setUser(undefined);
    }
  };

  const onLogin = async (authResponse: AuthResponse) => {
    const { token, user } = authResponse;
    try {
      await SecureStore.setItemAsync('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setAuthState({ token, authenticated: true });
      setUser(user);
    } catch (error) {
      console.error('Failed to save session', error);
      throw error;
    }
  };

  const onLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await AsyncStorage.removeItem('user');
      setAuthState({ token: null, authenticated: false });
      setUser(undefined);
    } catch (error) {
      console.error('Failed to clear session', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        user,
        onLogin,
        onLogout,
        loadSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
