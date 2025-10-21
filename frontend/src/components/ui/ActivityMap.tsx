import useGlobalStyles from "@/styles/global";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconSymbol } from "./icon-symbol";
import { MapPin } from "@/types";
import { router } from "expo-router";
import { BlurView } from 'expo-blur';

interface Props {
  markers?: MapPin[],
};

const ActivityMap = ({ markers }: Props) => {
  const styles = useGlobalStyles();
  const isAndroid = process.env.EXPO_OS !== 'ios';

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 50.88,
        longitude: 4.7,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      customMapStyle={[
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { featureType: 'administrative', stylers: [{ visibility: 'off' }] },
      ]}
    >

      {markers && markers.map((m, i) => (
        <Marker
          key={i}
          coordinate={{ latitude: m.coordinates.lat, longitude: m.coordinates.lon }}
          // title={m.title} // otherwise shows pop up
          onPress={() => router.push(`/(modals)/joinActivity/${m.activityId}`)}
          style={{ width: 40, height: 40}}
        >

          {m.icon && (
            <View style={{
              width: isAndroid ? 33 : 40,
              height: isAndroid ? 33 : 40,
              borderRadius: 50,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: m.icon.color,
            }}>
              <BlurView
                intensity={50}
                tint="light"
                style={StyleSheet.absoluteFill}
              />

                <IconSymbol size={isAndroid ? 25 : 30} name={m.icon.name} color={m.icon.color} />
            </View>
          )}

        </Marker>
      ))}

    </MapView>
  );
};

export default ActivityMap;