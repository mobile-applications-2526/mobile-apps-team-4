import Button from "@/components/inputs/Button";
import ActivityList from "@/components/ui/ActivityList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useAuth } from "@/context/AuthContext";
import ActivityService from "@/services/ActivityService";
import GroupService from "@/services/GroupService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, RefreshControl, ScrollView, Text, TouchableOpacity } from "react-native";

const GroupDetailPage = () => {
  const groupId = useLocalSearchParams().groupId;
  const styles = useGlobalStyles();
  const { user } = useAuth();

  const [group, setGroup] = useState<Group | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[] | undefined>(undefined);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const isGroupOwner = group?.owner.id === user?.id;

  const fetchGroup = async () => {
    const res = await GroupService.get(Number(groupId));
    setGroup(res);
    setRefreshing(false);
  };
  const fetchActivities = async () => {
    const res = await ActivityService.getByGroup(Number(groupId));
    setActivities(res);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchGroup();
    fetchActivities();
  }, [refreshing]);

  if (group === undefined) return <ActivityIndicator size={'large'} style={styles.containerCenter} />
  
  
  const sortedMembers = group.members.sort((a, b) => {
    if (a.id === group.owner.id) return -1;
    if (b.id === group.owner.id) return 1;
    return 0;
  });

  const handleDelete = async () => {

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this group?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            GroupService.deleteGroup(Number(groupId));
            router.back();
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
    >

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

          <ActivityList activities={activities} showGrabber={false} emptyMessage="No activities yet" />
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

      {isGroupOwner && (
        <>
          <Button
            onPress={() => router.push(`/(modals)/inviteUser?groupId=${groupId}`)}
            label="Invite a member"
          />
          <Button
            onPress={handleDelete}
            label="Delete group"
            highlight={false}
          />
        </>
      )}
    </ScrollView>
  );
};

export default GroupDetailPage;