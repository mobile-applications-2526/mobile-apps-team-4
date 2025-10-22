import useGlobalStyles from "@/styles/global";
import { Group } from "@/types";
import { router } from "expo-router";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

interface Props {
  groups: Group[],
}

const GroupsList = ({ groups }: Props) => {
  const styles = useGlobalStyles();

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          // onPress={() => router.push(`/(groups)/group/${item.id}`)}
        >
          <Text style={styles.heading}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text>No groups available</Text>}
    />
  );
};

export default GroupsList;