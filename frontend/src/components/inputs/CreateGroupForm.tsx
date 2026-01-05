import useGlobalStyles from "@/styles/global"
import Button from "./Button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Text } from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";
import GroupService from "@/services/GroupService";
import Toast from "react-native-toast-message";
import showErrorToast from "@/utils/showErrorToast";

const CreateGroupForm = () => {
  const styles = useGlobalStyles();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [error, setError] = useState<string>('');

  const descriptionRef = useRef<TextInput>(null);
  const membersRef = useRef<TextInput>(null);

  const handleGroupCreate = async () => {
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      await GroupService.create({ name, description });
      
      Toast.show({
        type: 'success',
        text1: 'Group created!',
      });
      
      router.replace('/(app)/groups');
    } catch (err) {
      router.back(); // otherwise toast doesnt show
      showErrorToast(err);
    }
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid
      extraHeight={15}
      extraScrollHeight={15}
      style={{ marginBottom: 20 }}
    >
      <Text style={styles.label}>Group name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Group name"
        placeholderTextColor={styles.placeholderText.color}
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        placeholderTextColor={styles.placeholderText.color}
        returnKeyType="next"
        multiline={true}
        textAlignVertical="top"
        ref={descriptionRef}
        onSubmitEditing={() => membersRef.current?.focus()}
        style={{...styles.input, minHeight: 80 }}
      />

      {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

      <Button
        onPress={handleGroupCreate}
        label='Create group'
        highlight
        style={{ marginTop: 'auto' }}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateGroupForm;