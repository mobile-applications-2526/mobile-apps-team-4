import useGlobalStyles from "@/styles/global";
import { Group } from "@/types";
import { router } from "expo-router";
import { Text, FlatList, TouchableOpacity, RefreshControl } from "react-native";

interface Props {
  groups: Group[],
  refreshGroups: () => void,
  refreshing: boolean,
}

const GroupsList = ({ groups, refreshGroups, refreshing }: Props) => {
  const styles = useGlobalStyles();

  return (
    <FlatList
      data={groups}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl onRefresh={refreshGroups} refreshing={refreshing || false} />
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => router.push(`/(app)/groups/${item.id}`)}
        >
          <Text style={styles.heading}>{item.name}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={<Text>No groups available</Text>}
    />
  );
};

export default GroupsList;