import { ActivityIndicator } from 'react-native';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupsList from '@/components/ui/GroupsList';
import { Group } from '@/types';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import GroupService from '@/services/GroupService';
import showErrorToast from '@/utils/showErrorToast';

export default function Groups() {
  const styles = useGlobalStyles();

  const [groups, setGroups] = useState<Group[] | undefined>(undefined);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await GroupService.getAll();
        setGroups(res || []);
      } catch (err) {
        showErrorToast(err);
      } finally {
        setRefreshing(false);
      }
    };

    fetchGroups();
  }, [refreshing]);

  if (groups === undefined) return <ActivityIndicator size={'large'} style={styles.containerCenter} />

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <PageHeading name='Groups' onAdd={() => router.push('/(modals)/createGroup')} />
      
      <GroupsList groups={groups} refreshGroups={() => setRefreshing(true)} refreshing={refreshing} />
    </SafeAreaView>
  );
};