import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

const JoinActivity = () => {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Join activity" />

    </SafeAreaView>
  );
};

export default JoinActivity;