import { Colors } from '@/constants/theme';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function GroupsLayout() {
  const isDark = useColorScheme() === 'dark';
  
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark
            ? Colors.dark.tabBackground
            : Colors.light.tabBackground
        },
        headerTintColor: isDark
          ? Colors.dark.tint
          : Colors.light.tint,
        headerTitleStyle: {
          color: isDark
            ? Colors.dark.text
            : Colors.light.text
        },
        contentStyle: {
          backgroundColor: '#ff0000ff',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="[groupId]/index"
        options={{
          title: 'Group Details',
          headerBackTitle: 'All Groups',
        }}
      />
    </Stack>
  );
}
