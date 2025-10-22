import CreateGroupForm from "@/components/inputs/CreateGroupForm";
import ModalHeading from "@/components/ui/ModalHeading";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroup = () => {
  const { signOut } = useSession();
  const styles = useGlobalStyles();

  const handleCreateGroup = async () => {

  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalHeading name="Create group" />

      <CreateGroupForm onCreateGroup={() => {}} />
    </SafeAreaView>
  );
};

export default CreateGroup;