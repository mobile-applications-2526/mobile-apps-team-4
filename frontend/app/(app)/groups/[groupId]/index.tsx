import useGlobalStyles from "@/styles/global";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const GroupDetailPage = () => {
  const groupId = useLocalSearchParams().groupId;
  const styles = useGlobalStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Group detail page id: {groupId}</Text>
    </View>
  );
};

export default GroupDetailPage;