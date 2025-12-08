import { RefreshControl, ScrollView, View } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import ActivityMap from '@/components/ui/ActivityMap';
import { Activity, ActivityWithDistance } from '@/types';
import { router } from 'expo-router';
import ActivityList from '@/components/ui/ActivityList';
import { useEffect, useState } from 'react';
import ActivityService from '@/services/ActivityService';
import { useAuth } from '@/context/AuthContext';
import showErrorToast from '@/utils/showErrorToast';
import * as Location from 'expo-location';
import { calculateDistance } from '@/utils/distanceUtils';

export default function Index() {
  const { user } = useAuth();
  const styles = useGlobalStyles();
  const isAndroid = process.env.EXPO_OS !== 'ios';

  const [activities, setActivities] = useState<ActivityWithDistance[]>([]);
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
        if (onlyJoined) {
          res = await ActivityService.getJoined() as ActivityWithDistance[];
        } else {
          res = await ActivityService.getAll() as ActivityWithDistance[];
        }

        if (!res) return;
        
        if (!location) {
          setActivities(res);
          return;
        }

        const activitiesWithDistance = res.map((a: Activity): ActivityWithDistance => ({
          ...a,
          distance: calculateDistance({
            coordinate1: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
            coordinate2: {
              latitude: a.location.latitude,
              longitude: a.location.longitude,
            },
          }),
        }));

        const sortedActivities: ActivityWithDistance[] = activitiesWithDistance.sort(
          (a, b) => (a.distance || 0) - (b.distance || 0)
        );

        setActivities(sortedActivities);
      } catch (err) {
        showErrorToast(err);
      } finally {
        setRefreshing(false);
      }
    };

    getActivities();
  }, [onlyJoined, refreshing, location]); // TODO: right now will refresh on every position change

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
