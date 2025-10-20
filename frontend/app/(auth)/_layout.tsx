import { Stack } from 'expo-router';

export default function AppLayout() {
  // This renders the navigation stack for all authenticated app routes.

  return (
    <Stack>
      <Stack.Screen name='sign-in' options={{ headerShown: false, animation: 'slide_from_left' }} />
      <Stack.Screen name='sign-up' options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  )
}
