import Button from "@/components/inputs/Button";
import ActivityDetailMap from "@/components/ui/ActivityDetailMap";
import { IconSymbol } from "@/components/ui/icon-symbol";
import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { Activity, Group } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { FlatList, ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const activity: Activity = {
  id: 8,
  group: 0,
  title: 'Farmers Market',
  date: new Date,
  coordinates: { lat: 50.873, lon: 4.702 },
  icon: { name: 'cart.fill', color: '#FFA500' },
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, perspiciatis hic aperiam consequatur ea molestiae odit eum accusamus fuga cumque.',
  peopleGoing: [
    {
      id: 0,
      name: "Barack Obama",
      email: "barack@obama.com",
    },
    {
      id: 1,
      name: "Joe Biden",
      email: "joe@biden.com",
    },
  ]
};

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
  const isDark = useColorScheme() === 'dark';


  const handleJoinActivity = () => {

  };

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Join activity" />

      <Text style={styles.pageHeading}>
        {activity.title}
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

      {activity.peopleGoing && activity.peopleGoing.length > 0 && (
        <>
          <Text style={styles.heading}>
            These people are going
          </Text>
          <FlatList
            data={activity.peopleGoing}
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
          />
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