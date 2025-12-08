import { ActivityIndicator, FlatList, RefreshControl, ScrollView, Text, useColorScheme, View } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import useGlobalStyles from '@/styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageHeading from '@/components/ui/PageHeading';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/theme';
import UserService from '@/services/UserService';
import Button from '@/components/inputs/Button';
import showErrorToast from '@/utils/showErrorToast';
import GroupService from '@/services/GroupService';
import Toast from 'react-native-toast-message';
import { Invite } from '@/types';

export default function Index() {
  const { user, onUpdateUser } = useAuth();
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const updateUser = async () => {
    const res = await UserService.getMe();
    if (!res || !onUpdateUser) return;

    onUpdateUser(res);
    setRefreshing(false);
  };

  useEffect(() => {
    updateUser();
  }, [refreshing]);

  const acceptInvite = async (invite: Invite) => {
    try {
      await GroupService.acceptInvite({ groupId: invite.id });

      Toast.show({
        type: 'success',
        text1: `Joined ${invite.name}`
      });
      updateUser();
    } catch (err) {
      showErrorToast(err);
    }
  };

  const declineInvite = async (invite: Invite) => {
    try {
      await GroupService.declineInvite({ groupId: invite.id });

      Toast.show({
        type: 'success',
        text1: `Removed invite for ${invite.name}`
      });
      updateUser();
    } catch (err) {
      showErrorToast(err);
    }
  };

  if (!user) return <ActivityIndicator size={'large'} style={styles.containerCenter} />;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(true)} />}
      >

        <PageHeading
          name='Account'
          extraOptions={[
            {
              label: 'Logout',
              onPress: () => router.push('/(modals)/logout'),
              icon: 'rectangle.portrait.and.arrow.right'
            },
            {
              label: 'Disabled',
              onPress: () => {},
              disabled: true,
            }
          ]}
        />

        <View style={{ marginBottom: 20 }}>

          <Text style={styles.heading}>
            Hello {user?.name}
          </Text>

          <Text style={styles.text}>
            {user?.email}
          </Text>

        </View>

        <Text style={styles.heading}>
          Invites
        </Text>
        <FlatList
          data={user.invites}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          ListEmptyComponent={<Text style={styles.text}>No invites received</Text>}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderWidth: 1,
                borderRadius: 8,
                gap: 4,
                borderColor: isDark ? Colors.dark.border : Colors.light.border,
                alignItems: 'center',
                flex: 1,
                marginBottom: 8,
              }}
            >
              <Text style={{ fontSize: 16, ...styles.text }}>
                You have been invited to 
              </Text>
              <Text style={{ fontSize: 20, ...styles.text, fontWeight: 'bold', marginBottom: 4 }}>
                {item.name}
              </Text>

              <View style={{ flex: 1, flexDirection: 'row', width: '100%', gap: '1%' }}>
                <Button
                  label='Accept'
                  onPress={() => acceptInvite(item)}
                  style={{ width: '49.5%' }}
                />
                <Button
                  label='Decline'
                  onPress={() => declineInvite(item)}
                  style={{ width: '49.5%' }}
                />
              </View>
            </View>
          )}
        />

      </ScrollView>
    </SafeAreaView>
  );
}
