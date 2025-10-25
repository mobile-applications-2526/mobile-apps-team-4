import { ActivityIndicator, Text } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupsList from '@/components/ui/GroupsList';
import { Group, User } from '@/types';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import GroupService from '@/services/GroupService';

export default function Groups() {
  const styles = useGlobalStyles();

  const [groups, setGroups] = useState<Group[] | undefined>(undefined);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await GroupService.getAll();
      setGroups(res || []);
    };

    fetchGroups();
  }, []);

  if (groups === undefined) return <ActivityIndicator size={'large'} style={styles.containerCenter} />

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <PageHeading name='Groups' onAdd={() => router.push('/(modals)/createGroup')} />
      
      <GroupsList groups={groups} />
    </SafeAreaView>
  );
}
