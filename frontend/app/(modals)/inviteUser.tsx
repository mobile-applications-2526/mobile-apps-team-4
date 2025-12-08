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
import Toast from "react-native-toast-message";
import GroupService from "@/services/GroupService";
import showErrorToast from "@/utils/showErrorToast";

const InviteUser = () => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  const { user } = useAuth();
  const groupId = useLocalSearchParams().groupId;

  const [search, setSearch] = useState<string>('');
  const [foundUsers, setFoundUsers] = useState<User[]>([]);

  useEffect(() => {
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

  if (!groupId) {
    router.back();
    return;
  }

  const inviteUser = async (user: User) => {
    
    try {
      await GroupService.inviteUser({ groupId: Number(groupId), userId: user.id });

      Toast.show({
        type: 'success',
        text1: `Invited ${user.name}`,
      });
    } catch (err) {
      showErrorToast(err);
    }
    
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
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

    </SafeAreaView>
  );
};

export default InviteUser;