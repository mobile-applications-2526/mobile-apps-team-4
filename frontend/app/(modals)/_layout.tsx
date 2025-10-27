import { Stack } from 'expo-router';

const ModalsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='logout' />
      <Stack.Screen name='createGroup' />
      <Stack.Screen name='createActivity' />
      <Stack.Screen name='activityDetails/[activityId]/index' />
    </Stack>
  )
};

export default ModalsLayout;
