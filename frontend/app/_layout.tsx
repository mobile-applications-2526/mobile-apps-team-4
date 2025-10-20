import { Stack } from 'expo-router';
import 'react-native-reanimated';

import SessionProvider, { useSession } from '../context/AuthContext';
import SplashScreenController from './splash';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function Root() {
  return (
    <SessionProvider>
      <SplashScreenController />
      <RootNavigator />
    </SessionProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();

  return (
    <Stack>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};
