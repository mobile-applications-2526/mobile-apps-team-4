import ActivityList from "@/components/ui/ActivityList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ActivityService from "@/services/ActivityService";
import GroupService from "@/services/GroupService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from "react-native";

const GroupDetailPage = () => {
  const groupId = useLocalSearchParams().groupId;
  const styles = useGlobalStyles();

  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[] | undefined>(undefined);

  useEffect(() => {
    const fetchGroup = async () => {
      const res = await GroupService.get(Number(groupId));
      setGroup(res);
    };
    const fetchActivities = async () => {
      const res = await ActivityService.getByGroup(Number(groupId));
      setActivities(res);
    }

    fetchGroup();
    fetchActivities();
  }, []);

  if (group === undefined) return <ActivityIndicator size={'large'} style={styles.containerCenter} />
  
  
  const sortedMembers = group.members.sort((a, b) => {
    if (a.id === group.owner.id) return -1;
    if (b.id === group.owner.id) return 1;
    return 0;
  });

  return (
    <View style={styles.container}>

      <Text style={styles.pageHeading}>
        {group.name}
      </Text>


      {group.description && (
        <>
          <Text style={styles.heading}>
            About us
          </Text>

          <Text style={styles.text}>
            {group.description}
          </Text>
        </>
      )}

      {activities && (
        <>
          <Text style={styles.heading}>
            Planned activities
          </Text>

          <ActivityList activities={activities} showGrabber={false} />
        </>
      )}

      <Text style={styles.heading}>
        Members
      </Text>

      <FlatList
        data={sortedMembers}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        style={{ marginBottom: 8, ...styles.borderColor, borderTopWidth: 1 }}
        renderItem={({ item }) => {
          const isOwner = item.id === group.owner.id;

          return (
            <TouchableOpacity
              style={styles.listItemSmall}
              onPress={() => {}} // later can go to profile page of user
            >
              {isOwner && (
                <IconSymbol size={28} name="star.fill" color={styles.tint.color} />
              )}

              <Text style={[{ fontSize: 14, ...styles.text }, isOwner && { fontWeight: 'bold' }]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  );
};

export default GroupDetailPage;