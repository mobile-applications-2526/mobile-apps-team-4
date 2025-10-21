import { Text } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupsList from '@/components/ui/GroupsList';
import { Group } from '@/types';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';

export default function Groups() {
  const styles = useGlobalStyles();

  const groups: Group[] = [
    {
      id: 0,
      name: 'The Presidents of the USA',
      owner: 0,
      members: [0,1,2,3,4]
    },
    {
      id: 1,
      name: 'Cool bros club',
      owner: 1,
      members: [0,1]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageHeading name='Groups' onAdd={() => router.push('/(modals)/createGroup')} onExtraOptions={() => {}} />
      
      <GroupsList groups={groups} />
    </SafeAreaView>
  );
}
