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
import * as Location from 'expo-location';

export default function Index() {
  const { user } = useAuth();
  const styles = useGlobalStyles();
  const isAndroid = process.env.EXPO_OS !== 'ios';

  const [activities, setActivities] = useState<Activity[]>([]);
  const [onlyJoined, setOnlyJoined] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [location, setLocation] = useState<Location.LocationObject | undefined>(undefined);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

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
        refreshControl={isAndroid
          ? undefined
          : <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />
        }
      >
        <ActivityMap activities={activities} location={location} />

        <ActivityList activities={activities} user={user} location={location} />

        <View style={{ height: 12 }} />
      </ScrollView>
      
    </SafeAreaView>
  );
}
