import useGlobalStyles from "@/styles/global";
import { Activity } from "@/types";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconSymbol } from "./icon-symbol";
import useMapStyle from "@/styles/map";

interface Props {
  activity: Activity,
};

const ActivityDetailMap = ({ activity }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const mapStyle = useMapStyle();
  const isAndroid = process.env.EXPO_OS !== 'ios';

  return (
    <>
      {loading && <ActivityIndicator size="large" />}

      <View style={{borderRadius: 12, overflow: 'hidden' }}>{/* otherwise android not rounded */}
        <MapView
          style={{
            flex: 1,
            borderRadius: 12,
            height: 200,
          }}
          initialRegion={{
            latitude: activity.coordinates.lat,
            longitude: activity.coordinates.lon,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={mapStyle}
          onMapReady={() => setLoading(false)}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >

          <Marker
            coordinate={{ latitude: activity.coordinates.lat, longitude: activity.coordinates.lon }}
            style={{ width: 40, height: 40}}
          >

            {activity.icon && (
              <View style={{
                width: isAndroid ? 33 : 40,
                height: isAndroid ? 33 : 40,
                borderRadius: 50,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: activity.icon.color,
              }}>
                <BlurView
                  intensity={50}
                  tint="light"
                  style={StyleSheet.absoluteFill}
                />

                  <IconSymbol size={isAndroid ? 22 : 30} name={activity.icon.name} color={activity.icon.color} />
              </View>
            )}

          </Marker>

        </MapView>
      </View>
    </>
  );
};

export default ActivityDetailMap;