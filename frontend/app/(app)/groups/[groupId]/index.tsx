import ActivityList from "@/components/ui/ActivityList";
import { IconSymbol } from "@/components/ui/icon-symbol";
import useGlobalStyles from "@/styles/global";
import { Activity, Group, User } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const members: User[] = [
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
];

const group: Group = {
  id: 0,
  name: 'The Presidents of the USA',
  owner: members[1],
  members,
  description: `We are the chocolate ice cream lovers. We love to stroll on a Sunday evening to the ice cream store, and get some ice cream, I love ice cream.`,
};

const activities: Activity[] = [
  {
    id: 0,
    name: "Ice cream store hangout",
    date: new Date(),
    hostedByGroupId: 0,
    location: { latitude: 50.873, longitude: 4.702 },
    icon: {
      name: 'fork.knife',
      color: '#FF6B6B',
    },
    startDate: new Date().toISOString(),
    participantIds: [0, 1],
  },
];

const GroupDetailPage = () => {
  const groupId = useLocalSearchParams().groupId;
  const styles = useGlobalStyles();
  
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