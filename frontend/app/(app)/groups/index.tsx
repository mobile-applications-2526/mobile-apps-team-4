import { Text } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupsList from '@/components/ui/GroupsList';
import { Group, User } from '@/types';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';

const members: User[] = [
  {
    id: 0,
    name: "Barack Obama",
    email: "barack@obama.com",
  },
  {
    id: 1,
    name: "Joe Biden",
    email: "joe@biden.com",
  },
];

const groups: Group[] = [
  {
    id: 0,
    name: 'The Presidents of the USA',
    owner: members[0],
    members,
  },
  {
    id: 1,
    name: 'Cool bros club',
    owner: members[1],
    members,
  },
];

export default function Groups() {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <PageHeading name='Groups' onAdd={() => router.push('/(modals)/createGroup')} />
      
      <GroupsList groups={groups} />
    </SafeAreaView>
  );
}
