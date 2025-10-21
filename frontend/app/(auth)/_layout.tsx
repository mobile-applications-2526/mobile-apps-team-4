import { Stack } from 'expo-router';

export default function AppLayout() {

  return (
    <Stack>
      <Stack.Screen name='signIn' options={{ headerShown: false, animation: 'slide_from_left' }} />
      <Stack.Screen name='signUp' options={{ headerShown: false, animation: 'slide_from_right' }} />
    </Stack>
  )
}
