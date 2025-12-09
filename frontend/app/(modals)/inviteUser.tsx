import ModalHeading from "@/components/ui/ModalHeading";
import useGlobalStyles from "@/styles/global";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { User } from "@/types";
import UserService from "@/services/UserService";
import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/theme";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { router, useLocalSearchParams } from "expo-router";
import GroupService from "@/services/GroupService";
import showErrorToast from "@/utils/showErrorToast";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const InviteUser = () => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  const { user } = useAuth();
  const groupId = useLocalSearchParams().groupId;

  const [search, setSearch] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [joinedUsers, setJoinedUsers] = useState<User[]>([]);

  const updateUsers = async () => {
    if (!groupId) return;

    const res = await GroupService.get(Number(groupId));
    setInvitedUsers(res?.invitedMembers || []);
    setJoinedUsers(res?.members || []);
  };

  useEffect(() => {
    updateUsers();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      if (search === '') {
        setFoundUsers([]);
      } else {
        const res = await UserService.findByEmailOrName(search);

        const alreadyInvitedIds = new Set(invitedUsers.map(u => u.id));
        const joinedUserIds = new Set(joinedUsers.map(u => u.id));

        setFoundUsers(res
          .filter(u => u.id !== user?.id) // exclude logged in user (group owner)
          .filter(u => !alreadyInvitedIds.has(u.id)) // exclude already invited
          .filter(u => !joinedUserIds.has(u.id)) // exclude joined members
        );
      }

    };

    getUsers();
  }, [search]);

  if (!groupId) {
    router.back();
    return;
  }

  const inviteUser = async (user: User) => {
    try {
      await GroupService.inviteUser({ groupId: Number(groupId), userId: user.id });

      updateUsers();
      setSearch('');
    } catch (err) {
      showErrorToast(err);
    }
  };

  const cancelInvite = async (user: User) => {
    try {
      await GroupService.cancelInvite({ groupId: Number(groupId), userId: user.id });

      updateUsers();
    } catch (err) {
      showErrorToast(err);
    }
  }

  return (
    <SafeAreaView style={styles.containerNoPadding}>
      <KeyboardAwareScrollView style={styles.container}>
        <ModalHeading name="Invite a member" />

        <Text style={styles.label}>Search user</Text>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Name'
          placeholderTextColor={styles.placeholderText.color}
          returnKeyType="done"
          style={styles.input}
        />

        <FlatList
          data={foundUsers}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={{ marginBottom: 8, ...(foundUsers.length > 0 && { ...styles.borderColor, borderTopWidth: 1 }) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItemSmall}
              onPress={() => inviteUser(item)}
            >
              <IconSymbol size={20} name="plus" color={isDark ? Colors.dark.tint : Colors.light.tint} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.name}</Text>
              <Text style={{ fontSize: 14, marginLeft: 'auto', ...styles.text }}>{item.email}</Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.label}>Invited users</Text>
        <FlatList
          data={invitedUsers}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={{ marginBottom: 8, ...(invitedUsers.length > 0 && { ...styles.borderColor, borderTopWidth: 1 }) }}
          ListEmptyComponent={<Text style={styles.text}>No pending invites</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItemSmall}
              onPress={() => cancelInvite(item)}
            >
              <IconSymbol size={20} name="xmark" color={isDark ? Colors.dark.tint : Colors.light.tint} />
              <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.name}</Text>
              <Text style={{ fontSize: 14, marginLeft: 'auto', ...styles.text }}>{item.email}</Text>
            </TouchableOpacity>
          )}
        />

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default InviteUser;