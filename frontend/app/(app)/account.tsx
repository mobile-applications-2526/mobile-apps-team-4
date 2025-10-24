import { Text, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';

export default function Index() {
  const { user } = useAuth();
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>

      <PageHeading name='Account' onExtraOptions={() => router.push('/(modals)/logout')} />

      <View style={{ marginBottom: 20 }}>

        <Text style={styles.heading}>
          Hello {user?.name}
        </Text>

        <Text style={styles.text}>
          {user?.email}
        </Text>

      </View>

    </SafeAreaView>
  );
}
