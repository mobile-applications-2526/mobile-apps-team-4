import Button from "@/components/inputs/Button";
import ActivityDetailMap from "@/components/ui/ActivityDetailMap";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ModalHeading from "@/components/ui/ModalHeading";
import ActivityService from "@/services/ActivityService";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


const group: Group = {
  id: 0,
  name: "Presidents of the USA",
  owner: {
    id: 0,
    name: "",
    email: ""
  },
  members: []
};

const JoinActivity = () => {
  const activityId = useLocalSearchParams().activityId;
  const styles = useGlobalStyles();

  const [activity, setActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    const getActivity = async () => {
      const res = await ActivityService.get(Number(activityId));
      setActivity(res);
    };

    getActivity();
  }, [])


  const handleJoinActivity = () => {

  };

  if (!activity) return <ActivityIndicator size='large' />

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
      
      <Text style={styles.heading}>
        Organized by
      </Text>
      <Text>
        {group.name}
      </Text>

      {activity.participantIds && activity.participantIds.length > 0 && (
        <>
          <Text style={styles.heading}>
            These people are going
          </Text>
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