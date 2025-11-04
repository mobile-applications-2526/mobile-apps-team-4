import useGlobalStyles from "@/styles/global"
import Button from "./Button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Text, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { User } from "@/types";
import { IconSymbol } from "../ui/icon-symbol";
import { Colors } from "@/constants/theme";
import UserService from "@/services/UserService";
import GroupService from "@/services/GroupService";
import Toast from "react-native-toast-message";
import showErrorToast from "@/utils/showErrorToast";
import { useAuth } from "@/context/AuthContext";

const CreateGroupForm = () => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  const { user } = useAuth();

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [members, setMembers] = useState<User[]>([]);

  const [search, setSearch] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const addMemberUsers = foundUsers.filter(u => !members.some(m => m.id === u.id));

  const descriptionRef = useRef<TextInput>(null);
  const membersRef = useRef<TextInput>(null);

  useEffect(() => { // TODO: should debounce this
    const getUsers = async () => {
      if (search === '') {
        setFoundUsers([]);
      } else {
        const res = await UserService.findByEmailOrName(search);

        setFoundUsers(res.filter(u => u.id !== user?.id)); // exclude logged in user
      }

    };

    getUsers();
  }, [search]);

  const handleGroupCreate = async () => {
    if (!name) {
      setError('Name is required');
      return;
    }

    try {
      await GroupService.create({ name, description, members: members.map(m => m.id) });
      
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

      <Text style={styles.label}>Add members</Text>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search by name or email"
        placeholderTextColor={styles.placeholderText.color}
        returnKeyType="done"
        ref={membersRef}
        onSubmitEditing={handleGroupCreate}
        style={styles.input}
      />

      <FlatList
        data={addMemberUsers}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        style={{ marginBottom: 8, ...(addMemberUsers.length > 0 && { ...styles.borderColor, borderTopWidth: 1 }) }}
        renderItem={({ item }) => (
          <TouchableOpacity
          style={styles.listItemSmall}
          onPress={() => setMembers(prev => [...prev, item])}
          >
            <IconSymbol size={20} name="plus" color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.name}</Text>
            <Text style={{ fontSize: 14, marginLeft: 'auto', ...styles.text }}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      {search !== '' && addMemberUsers.length === 0 && (
        <Text style={{ fontWeight: 'bold', marginHorizontal: 'auto', marginBottom: 20, ...styles.text }}>
          No users found
        </Text>
      )}

      <Text style={styles.label}>Members</Text>
      <FlatList
        data={members}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        style={{ marginBottom: 8, ...(members.length > 0 && { ...styles.borderColor, borderTopWidth: 1 }) }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItemSmall}
            onPress={() => setMembers(prev => prev.filter(m => m.id !== item.id))}
          >
            <IconSymbol size={20} name="xmark" color={isDark ? Colors.dark.tint : Colors.light.tint} />
            <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.name}</Text>
            <Text style={{ fontSize: 14, marginLeft: 'auto', ...styles.text }}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={(
          <Text style={{ fontWeight: 'bold', marginHorizontal: 'auto', marginBottom: 8, ...styles.text }}>
            No members added yet
          </Text>
        )}
      />

      {error ? <Text style={{ color: 'red', paddingBottom: 8 }}>{error}</Text> : null}

      <Button
        onPress={handleGroupCreate}
        label='Create group'
        highlight={members.length !== 0}
        style={{ marginTop: 'auto' }}
      />
    </KeyboardAwareScrollView>
  );
};

export default CreateGroupForm;