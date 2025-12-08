import Button from "@/components/inputs/Button";
import ActivityDetailMap from "@/components/ui/ActivityDetailMap";
import ModalHeading from "@/components/ui/ModalHeading";
import { useAuth } from "@/context/AuthContext";
import ActivityService from "@/services/ActivityService";
import GroupService from "@/services/GroupService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import { formatDate } from "@/utils/dateUtils";
import pushWithHistory from "@/utils/pushWithHistory";
import showErrorToast from "@/utils/showErrorToast";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';


const JoinActivity = () => {
  const activityId = useLocalSearchParams().activityId;
  const styles = useGlobalStyles();
  const { user } = useAuth();

  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [group, setGroup] = useState<Group | undefined>(undefined);

  const joined = activity?.participants.includes(user!.name);
  const activityOwner = group?.owner.id === user?.id;

  useEffect(() => {
    const getActivity = async () => {
      const res = await ActivityService.get(Number(activityId));
      setActivity(res);
    };
    getActivity();
  }, [])

  useEffect(() => {
    const getGroup = async () => {
      if (!activity) return;

      const res = await GroupService.get(activity.hostedByGroupId);
      setGroup(res);
    };

    getGroup();
  }, [activity])

  if (!activity) return <ActivityIndicator size='large' style={styles.containerCenter} />


  const handleJoinOrLeave = async () => {
    router.back();

    try {
      if (joined) {
        await ActivityService.leave(activity.id);

        Toast.show({
          type: 'success',
          text1: 'Left',
          text2: `You left ${activity.name}`,
        });
      } else {
        await ActivityService.join(activity.id);

        Toast.show({
          type: 'success',
          text1: 'Joined',
          text2: `You joined ${activity.name}`,
        });
      }
      
    } catch (err) {
      showErrorToast(err);
    }
  };

  const handleDelete = async () => {

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this activity?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            ActivityService.deleteActivity(Number(activityId));
            router.back();
          },
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Join activity" />

      <Text style={styles.pageHeading}>
        {activity.name}
      </Text>

      {activity.description && (
        <Text style={styles.text}>
          {activity.description}
        </Text>
      )}
      
      {group && (
        <>
        <Text style={styles.heading}>
          Organized by
        </Text>
        <Button
          label={group.name}
          highlight={false}
          onPress={() => pushWithHistory('/(app)/groups', `/(app)/groups/${group.id}`)}
        />
  
        {activity.participants && activity.participants.length > 0 && (
          <>
            <Text style={styles.heading}>
              These people are going
            </Text>
            <View>
              {activity.participants.map(p => (
                <Text key={p} style={styles.text}>
                  {p}
                </Text>
              ))}
            </View>
          </>
        )}
        </>
      )}

      <Text style={styles.heading}>
        Timeframe
      </Text>
      <View>
        <Text style={styles.text}>
          Starts at:{' '}
          <Text style={{ fontWeight: 'bold' }}>
            {formatDate(new Date(activity.startDate))}
          </Text>
        </Text>

        {activity.endDate && (
          <Text style={styles.text}>
            Ends at:{' '}
            <Text style={{ fontWeight: 'bold' }}>
              {formatDate(new Date(activity.endDate))}
            </Text>
          </Text>
        )}
      </View>

      <Text style={styles.heading}>
        Location
      </Text>
      <ScrollView>
        <ActivityDetailMap activity={activity} />
      </ScrollView>

      {activityOwner && (
        <Button
          label="Delete activity"
          onPress={handleDelete}
          highlight={false}
        />
      )}
      <Button
        label={joined ? "Leave activity" : "Join activity"}
        onPress={handleJoinOrLeave}
      />

    </SafeAreaView>
  );
};

export default JoinActivity;