import { Stack } from 'expo-router';

export default function StackLayout() {

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='logout' />
      <Stack.Screen name='createGroup' />
      <Stack.Screen name='createActivity' />
      <Stack.Screen name='joinActivity' />
    </Stack>
  )
}
