import CreateGroupForm from "@/components/inputs/CreateGroupForm";
import ModalHeading from "@/components/ui/ModalHeading";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import { View } from "react-native";

const CreateGroup = () => {
  const { signOut } = useSession();
  const styles = useGlobalStyles();

  const handleCreateGroup = async () => {

  };

  return (
    <View style={styles.container}>
      <ModalHeading name="Create group" />

      <CreateGroupForm onCreateGroup={() => {}} />
    </View>
  );
};

export default CreateGroup;