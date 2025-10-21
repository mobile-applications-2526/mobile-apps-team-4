import Button from "@/components/inputs/Button";
import ModalHeading from "@/components/ui/ModalHeading";
import { useSession } from "@/context/AuthContext";
import useGlobalStyles from "@/styles/global";
import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateGroup = () => {
  const { signOut } = useSession();
  const styles = useGlobalStyles();

  const [groupName, setGroupName] = useState<string>('');

  const handleCreateGroup = async () => {

  };

  return (
    <SafeAreaView style={styles.container}>

      <ModalHeading name="Create group" />

      <Text style={styles.label}>Group name</Text>
      <TextInput
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Group name"
        returnKeyType="done"
        style={styles.input}
      />

      <Button
        onPress={handleCreateGroup}
        label='Create group'
      />
    </SafeAreaView>
  );
};

export default CreateGroup;