import { Text, View } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';

export default function Index() {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container}>
      <PageHeading name='Home' />
      
    </SafeAreaView>
  );
}
