import { ScrollView, Text } from 'react-native';

import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import ActivityMap from '@/components/ui/ActivityMap';
import { Activity } from '@/types';
import { router } from 'expo-router';
import ActivityList from '@/components/ui/ActivityList';

export default function Index() {
  const styles = useGlobalStyles();

  const activities: Activity[] = [
    {
      id: 0,
      group: 0,
      title: 'Coffee Break',
      date: new Date,
      coordinates: { lat: 50.879, lon: 4.700 },
      icon: { name: 'cup.and.saucer.fill', color: '#D2691E' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 1,
      group: 0,
      title: 'Library Visit',
      date: new Date,
      coordinates: { lat: 50.8795, lon: 4.703 },
      icon: { name: 'books.vertical.fill', color: '#1E90FF' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 2,
      group: 0,
      title: 'Bike Ride',
      date: new Date,
      coordinates: { lat: 50.875, lon: 4.709 },
      icon: { name: 'bicycle', color: '#32CD32' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 3,
      group: 0,
      title: 'Concert',
      date: new Date,
      coordinates: { lat: 50.872, lon: 4.705 },
      icon: { name: 'music.note.house.fill', color: '#FF1493' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 4,
      group: 0,
      title: 'Picnic',
      date: new Date,
      coordinates: { lat: 50.876, lon: 4.710 },
      icon: { name: 'leaf.fill', color: '#228B22' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 5,
      group: 0,
      title: 'Art Exhibition',
      date: new Date,
      coordinates: { lat: 50.878, lon: 4.707 },
      icon: { name: 'paintpalette.fill', color: '#FF8C00' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 6,
      group: 0,
      title: 'Movie Night',
      date: new Date,
      coordinates: { lat: 50.874, lon: 4.704 },
      icon: { name: 'film.fill', color: '#8A2BE2' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 7,
      group: 0,
      title: 'Yoga Class',
      date: new Date,
      coordinates: { lat: 50.877, lon: 4.708 },
      icon: { name: 'figure.walk', color: '#00CED1' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 8,
      group: 0,
      title: 'Farmers Market',
      date: new Date,
      coordinates: { lat: 50.873, lon: 4.702 },
      icon: { name: 'cart.fill', color: '#FFA500' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
    {
      id: 9,
      group: 0,
      title: 'Tech Meetup',
      date: new Date,
      coordinates: { lat: 50.8755, lon: 4.7065 },
      icon: { name: 'desktopcomputer', color: '#4682B4' },
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
    },
  ];

  return (
    <SafeAreaView style={{ ...styles.container, paddingBottom: 0 }} edges={['top', 'left', 'right']}>
      <PageHeading name='Home' onAdd={() => router.push('/(modals)/createActivity')} />

      <ScrollView style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }} showsVerticalScrollIndicator={false} >
        <ActivityMap activities={activities} />

        <ActivityList activities={activities} />
      </ScrollView>
      
    </SafeAreaView>
  );
}
