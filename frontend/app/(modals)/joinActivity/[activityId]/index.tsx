import Button from "@/components/inputs/Button";
import ActivityDetailMap from "@/components/ui/ActivityDetailMap";
import ModalHeading from "@/components/ui/ModalHeading";
import ActivityService from "@/services/ActivityService";
import GroupService from "@/services/GroupService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import isApiError from "@/utils/isApiError";
import showErrorToast from "@/utils/showErrorToast";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from 'react-native-toast-message';


const JoinActivity = () => {
  const activityId = useLocalSearchParams().activityId;
  const styles = useGlobalStyles();

  const [activity, setActivity] = useState<Activity | undefined>(undefined);
  const [group, setGroup] = useState<Group | undefined>(undefined);

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


  const handleJoinActivity = async () => {
    router.back();

    try {
      await ActivityService.join(activity.id);
      
      Toast.show({
        type: 'success',
        text1: 'Joined',
        text2: `You joined ${activity.name}`,
      });
    } catch (err) {
      console.log('ERROR:', err)
      showErrorToast(err);
    }
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
        {/* <Text style={styles.text}>
          {group.name}
        </Text> */}
        <Button
          label={group.name}
          highlight={false}
          onPress={() => router.push(`/(app)/groups/${group.id}`)}
        />
  
        {activity.participantIds && activity.participantIds.length > 0 && (
          <>
            <Text style={styles.heading}>
              These people are going
            </Text>
            <Text>{activity.participantIds.toString()}</Text>
            {/* <FlatList
              data={activity.participantIds}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              style={{ marginBottom: 8, ...styles.borderColor, borderTopWidth: 1 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.listItemSmall}
                  onPress={() => {}} // later can go to profile page of user
                >
                  <Text style={{ fontSize: 14, ...styles.text }}>{item.name}</Text>
                </TouchableOpacity>
              )}
            /> */}
          </>
        )}
        </>
      )}

      <ScrollView style={{ marginTop: 8 }}>
        <ActivityDetailMap activity={activity} />
      </ScrollView>

      <Button
        label="Join activity"
        onPress={handleJoinActivity}
      />

    </SafeAreaView>
  );
};

export default JoinActivity;