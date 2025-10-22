import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const JoinActivity = () => {
  const params = useLocalSearchParams();
  const styles = useGlobalStyles();
  const activityId = params.activityId;

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Join activity" />

      <Text style={styles.heading}>{activityId}</Text>



    </SafeAreaView>
  );
};

export default JoinActivity;