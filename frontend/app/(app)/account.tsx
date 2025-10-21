import { Text, View } from 'react-native';

import { useSession } from '@/src/context/AuthContext';

export default function Index() {
  const { signOut } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` redirects to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>

      <Text>Account Page</Text>
    </View>
  );
}
