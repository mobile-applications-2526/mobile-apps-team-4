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
  const [showAllGroups, setShowAllGroups] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        let res

        if (showAllGroups) {
          res = await GroupService.getAll()
        } else {
          res = await GroupService.getJoined()
        }
        
        setGroups(res || []);
      } catch (err) {
        showErrorToast(err);
      } finally {
        setRefreshing(false);
      }
    };

    fetchGroups();
  }, [refreshing, showAllGroups]);

  if (groups === undefined) return <ActivityIndicator size={'large'} style={styles.containerCenter} />

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <PageHeading
        name='Groups'
        onAdd={() => router.push('/(modals)/createGroup')}
        extraOptions={[
          {
            label: 'Show all groups',
            onPress: () => setShowAllGroups(!showAllGroups),
            icon: showAllGroups ? 'checkmark' : undefined,
          }
        ]}
      />
      
      <GroupsList groups={groups} refreshGroups={() => setRefreshing(true)} refreshing={refreshing} />
    </SafeAreaView>
  );
};