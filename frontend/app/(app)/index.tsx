import { ScrollView, Text, View } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import ActivityMap from '@/components/ui/ActivityMap';
import { Activity } from '@/types';
import { router } from 'expo-router';
import ActivityList from '@/components/ui/ActivityList';
import { useEffect, useState } from 'react';
import ActivityService from '@/services/ActivityService';

export default function Index() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const styles = useGlobalStyles();


  useEffect(() => {
    const getActivities = async () => {
      const res = await ActivityService.getAll();
      setActivities(res || []);
    };

    getActivities();
  }, []);

  return (
    <SafeAreaView style={{ ...styles.container, paddingBottom: 0 }} edges={['top', 'left', 'right']}>
      <PageHeading name='Home' onAdd={() => router.push('/(modals)/createActivity')} />

      <ScrollView style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} showsVerticalScrollIndicator={false} >
        <ActivityMap activities={activities} />

        <ActivityList activities={activities} />

        <View style={{ height: 12 }} />
      </ScrollView>
      
    </SafeAreaView>
  );
}
