import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '@/context/AuthContext';

export default function SplashScreenController() {
  const { authState } = useAuth();

  useEffect(() => {
    if (authState?.authenticated !== null) {
      SplashScreen.hideAsync();
    }
  }, [authState]);

  return null;
}
