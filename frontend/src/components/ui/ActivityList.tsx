import { Activity, User } from "@/types";
import { FlatList, TouchableOpacity, Text, useColorScheme, View } from "react-native";
import { IconSymbol } from "./icon-symbol";
import useGlobalStyles from "@/styles/global";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import Button from "../inputs/Button";
import { LocationObject } from "expo-location";
import { calculateAndFormatDistance } from "@/utils/distanceUtils";
import { formatDate } from "@/utils/dateUtils";

interface Props {
  activities: Activity[],
  user?: User;
  showGrabber?: boolean,
  emptyMessage?: string,
  location?: LocationObject,
};

const ActivityList = ({ activities, user, showGrabber = true, emptyMessage = 'No activities found', location }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      {showGrabber && (
        <View style={{ height: 4, width: 50, borderRadius: 50, backgroundColor: isDark ? Colors.dark.border : Colors.light.border, marginHorizontal: 'auto', marginTop: 8 }} />
      )}

      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        style={{ borderRadius: 8 }}
        ListEmptyComponent={
          <Text style={{ ...styles.text, textAlign: 'center', paddingVertical: 8 }}>{emptyMessage}</Text>
        }
        renderItem={({ item }) => (

          <TouchableOpacity
            style={{
              marginTop: 8,
              padding: 16,
              gap: 8,
              alignItems: 'center',
              backgroundColor: isDark ? Colors.dark.backgroundContent : Colors.light.backgroundContent,
              flexDirection: 'column',
              borderRadius: 8,
            }}
            onPress={() => router.push(`/(modals)/activityDetails/${item.id}`)}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {item.icon && (
                <IconSymbol size={20} name={item.icon.name} color={item.icon.color} />
              )}

              <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.name}</Text>
            </View>

            {item.description && (
              <Text style={{ fontSize: 12, ...styles.text }}>
                {item.description}
              </Text>
            )}

            {location && (
              <Text style={styles.text}>
                {calculateAndFormatDistance({
                  coordinate1: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  },
                  coordinate2: {
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                  },
                })}

                {' '}—{' '}
                {formatDate(new Date(item.startDate))}
              </Text>
            )}

            <Button
              label={user && item.participantIds.includes(user.id) ? 'Leave activity' : 'Join Activity'}
              onPress={() => router.push(`/(modals)/activityDetails/${item.id}`)}
              highlight={!(user && item.participantIds.includes(user.id))}
            />
          </TouchableOpacity>

        )}
      />
    </>
  );
};

export default ActivityList;