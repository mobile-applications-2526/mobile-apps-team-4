import Login from '@/components/auth/Login';
import BackendStatus from '@/components/ui/BackendStatus';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn() {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.containerCenter}>
      <BackendStatus />
      <Login />
    </SafeAreaView>
  );
};
