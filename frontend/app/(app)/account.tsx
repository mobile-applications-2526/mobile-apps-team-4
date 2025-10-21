import { Text, View } from 'react-native';
import { useSession } from '@/context/AuthContext';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@/components/inputs/Button';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PageHeading from '@/components/ui/PageHeading';

export default function Index() {
  const { signOut } = useSession();
  const styles = useGlobalStyles();

  const [user, setUser] = useState<{ email: string, name: string } | undefined>(undefined);

  useEffect(() => {
    const getUser = async () => {
      setUser(JSON.parse(await AsyncStorage.getItem('user') || ''));
    };

    getUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <PageHeading name='Account' onExtraOptions={() => {}} />

      <View style={{ marginBottom: 20 }}>

        <Text style={styles.heading}>
          Hello {user?.name}
        </Text>

        <Text style={styles.text}>
          {user?.email}
        </Text>

      </View>

      <Button
        onPress={signOut}
        label='Sign out'
        highlight={false}
      />

    </SafeAreaView>
  );
}
