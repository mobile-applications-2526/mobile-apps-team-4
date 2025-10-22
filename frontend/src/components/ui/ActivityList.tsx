import { Activity } from "@/types";
import { FlatList, TouchableOpacity, Text, useColorScheme, View } from "react-native";
import { IconSymbol } from "./icon-symbol";
import useGlobalStyles from "@/styles/global";
import { router } from "expo-router";
import { Colors } from "@/constants/theme";
import Button from "../inputs/Button";

interface Props {
  activities: Activity[],
};

const ActivityList = ({ activities }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';

  return (
    <>
      <View style={{ height: 4, width: 50, borderRadius: 50, backgroundColor: isDark ? Colors.dark.border : Colors.light.border, marginHorizontal: 'auto', marginTop: 8 }} />

      <FlatList
        data={activities}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        style={{ borderRadius: 8 }}
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
            onPress={() => router.push(`/(modals)/joinActivity/${item.id}`)}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {item.icon && (
                <IconSymbol size={20} name={item.icon.name} color={item.icon.color} />
              )}

              <Text style={{ fontSize: 16, fontWeight: 'bold', ...styles.text }}>{item.title}</Text>
            </View>

            <Text style={{ fontSize: 12, ...styles.text }}>{item.description}</Text>

            <Button label='Join Activity' onPress={() => router.push(`/(modals)/joinActivity/${item.id}`)} />
          </TouchableOpacity>

        )}
      />
    </>
  );
};

export default ActivityList;