import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateActivity = () => {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Create activity" />

    </SafeAreaView>
  );
};

export default CreateActivity;