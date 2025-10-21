import { ScrollView } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import ActivityMap from '@/components/ui/ActivityMap';
import { MapPin } from '@/types';
import { router } from 'expo-router';

export default function Index() {
  const styles = useGlobalStyles();

  const markers: MapPin[] = [
    {
      title: 'Coffee Break',
      activityId: 0,
      coordinates: { lat: 50.879, lon: 4.700 },
      icon: { name: 'cup.and.saucer.fill', color: '#D2691E' },
    },
    {
      title: 'Library Visit',
      activityId: 1,
      coordinates: { lat: 50.8795, lon: 4.703 },
      icon: { name: 'books.vertical.fill', color: '#1E90FF' },
    },
    {
      title: 'Bike Ride',
      activityId: 2,
      coordinates: { lat: 50.875, lon: 4.709 },
      icon: { name: 'bicycle', color: '#32CD32' },
    },
    {
      title: 'Concert',
      activityId: 3,
      coordinates: { lat: 50.872, lon: 4.705 },
      icon: { name: 'music.note.house.fill', color: '#FF1493' },
    },
    {
      title: 'Picnic',
      activityId: 4,
      coordinates: { lat: 50.876, lon: 4.710 },
      icon: { name: 'leaf.fill', color: '#228B22' },
    },
    {
      title: 'Art Exhibition',
      activityId: 5,
      coordinates: { lat: 50.878, lon: 4.707 },
      icon: { name: 'paintpalette.fill', color: '#FF8C00' },
    },
    {
      title: 'Movie Night',
      activityId: 6,
      coordinates: { lat: 50.874, lon: 4.704 },
      icon: { name: 'film.fill', color: '#8A2BE2' },
    },
    {
      title: 'Yoga Class',
      activityId: 7,
      coordinates: { lat: 50.877, lon: 4.708 },
      icon: { name: 'figure.walk', color: '#00CED1' },
    },
    {
      title: 'Farmers Market',
      activityId: 8,
      coordinates: { lat: 50.873, lon: 4.702 },
      icon: { name: 'cart.fill', color: '#FFA500' },
    },
    {
      title: 'Tech Meetup',
      activityId: 9,
      coordinates: { lat: 50.8755, lon: 4.7065 },
      icon: { name: 'desktopcomputer', color: '#4682B4' },
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <PageHeading name='Home' onAdd={() => router.push('/(modals)/createActivity')} />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
        <ActivityMap markers={markers} />
      </ScrollView>
      
    </SafeAreaView>
  );
}
