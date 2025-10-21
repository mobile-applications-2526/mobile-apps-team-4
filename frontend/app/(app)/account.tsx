import { Text, View } from 'react-native';
import { useSession } from '@/context/AuthContext';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/inputs/Button';

export default function Index() {
  const { signOut } = useSession();
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.containerCenter}>
      <Text style={styles.text}>Account Page</Text>

      <Button
        onPress={signOut}
        label='Sign out'
      />
      <Button
        onPress={signOut}
        label='Sign out'
        highlight={false}
      />

    </SafeAreaView>
  );
}
