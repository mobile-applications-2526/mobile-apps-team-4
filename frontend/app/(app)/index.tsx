import { RefreshControl, ScrollView, View } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import ActivityMap from '@/components/ui/ActivityMap';
import { Activity } from '@/types';
import { router } from 'expo-router';
import ActivityList from '@/components/ui/ActivityList';
import { useEffect, useState } from 'react';
import ActivityService from '@/services/ActivityService';
import { useAuth } from '@/context/AuthContext';
import showErrorToast from '@/utils/showErrorToast';

export default function Index() {
  const { user } = useAuth();
  const styles = useGlobalStyles();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [onlyJoined, setOnlyJoined] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const getActivities = async () => {
      try {
        let res;
        if (!onlyJoined) {
          res = await ActivityService.getAll();
        } else {
          res = await ActivityService.getJoined();
        }

        setActivities(res || []);
      } catch (err) {
        showErrorToast(err);
      } finally {
        setRefreshing(false);
      }
    };

    getActivities();
  }, [onlyJoined, refreshing]);

  return (
    <SafeAreaView style={{ ...styles.container, paddingBottom: 0 }} edges={['top', 'left', 'right']}>
      
      <PageHeading
        name='Home' 
        onAdd={() => router.push('/(modals)/createActivity')}
        extraOptions={[
          {
            label: 'Refresh',
            onPress: () => setRefreshing(true),
            icon: 'arrow.clockwise',
          },
          {
            label: 'Only show joined activities',
            onPress: () => setOnlyJoined(!onlyJoined),
            icon: onlyJoined ? 'checkmark' : undefined,
          },
        ]}  
      />

      <ScrollView
        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, height: 500 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
        }
      >
        <ActivityMap activities={activities} />

        <ActivityList activities={activities} user={user} />

        <View style={{ height: 12 }} />
      </ScrollView>
      
    </SafeAreaView>
  );
}
