import { SplashScreen, Stack } from 'expo-router';
import 'react-native-reanimated';

import SplashScreenController from './splash';
import { AuthProvider, useAuth } from '@/context/AuthContext';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Root() {
  return (
    <AuthProvider>
      <SplashScreenController />
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { authState } = useAuth();

  return (
    <Stack>
      <Stack.Protected guard={!!authState?.token}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(modals)" options={{ headerShown: false, presentation: 'modal' }} />
      </Stack.Protected>

      <Stack.Protected guard={!authState?.token}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
