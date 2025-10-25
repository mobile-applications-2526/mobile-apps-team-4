import CreateGroupForm from "@/components/inputs/CreateGroupForm";
import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroup = () => {
  const styles = useGlobalStyles();

  return (
    <SafeAreaView style={styles.container}>
      <ModalHeading name="Create group" />

      <CreateGroupForm />
    </SafeAreaView>
  );
};

export default CreateGroup;