import { Stack } from 'expo-router';

const ModalsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='activityDetails/[activityId]/index' />
      <Stack.Screen name='createActivity' />
      <Stack.Screen name='createGroup' />
      <Stack.Screen name='inviteUser' />
      <Stack.Screen name='logout' />
    </Stack>
  )
};

export default ModalsLayout;
