import useGlobalStyles from "@/styles/global"
import Button from "./Button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { TextInput, Text, FlatList, TouchableOpacity, useColorScheme } from "react-native";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { User } from "@/types";
import { IconSymbol } from "../ui/icon-symbol";
import { Colors } from "@/constants/theme";

interface Props {
  onCreateGroup: () => void;
}

const CreateGroupForm = ({ onCreateGroup }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [members, setMembers] = useState<User[]>([]);

  const [search, setSearch] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const addMemberUsers = foundUsers.filter(u => !members.some(m => m.id === u.id));

  const descriptionRef = useRef<TextInput>(null);
  const membersRef = useRef<TextInput>(null);

  useEffect(() => { // should debounce this
    const getUsers = async () => {
      if (search !== '') {
        const res = [
          {
            id: 0,
            name: "Barack Obama",
            email: "barack@obama.com",
          },
          {
            id: 1,
            name: "Joe Biden",
            email: "joe@biden.com",
          },
        ];

        setFoundUsers(res);
      } else {
        setFoundUsers([]);
      }

    };

    getUsers();
  }, [search]);

  const handleGroupCreate = () => {
    router.back();
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      bounces={false}
      enableOnAndroid
      extraHeight={15}
      extraScrollHeight={15}
    >
      <Text style={styles.label}>Group name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Group name"
        returnKeyType="next"
        onSubmitEditing={() => descriptionRef.current?.focus()}
        style={styles.input}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
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
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, marginLeft: 'auto' }}>{item.email}</Text>
          </TouchableOpacity>
        )}
      />

      {search !== '' && addMemberUsers.length === 0 && (
        <Text style={{ fontWeight: 'bold', marginHorizontal: 'auto', marginBottom: 20 }}>No users found</Text>
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
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text style={{ fontSize: 14, marginLeft: 'auto' }}>{item.email}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ fontWeight: 'bold', marginHorizontal: 'auto', marginBottom: 8 }}>No members added yet</Text>}
      />

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