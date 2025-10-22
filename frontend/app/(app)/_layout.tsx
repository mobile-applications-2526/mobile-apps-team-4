import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function AppLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? Colors.dark.tabIconSelected : Colors.light.tabIconSelected,
        tabBarInactiveTintColor: isDark ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: isDark ? Colors.dark.tabBackground : Colors.light.tabBackground,
          borderColor: isDark ? Colors.dark.border : Colors.light.border,
        },
        
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  )
}
