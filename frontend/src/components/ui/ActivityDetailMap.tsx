import { Activity } from "@/types";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { IconSymbol } from "./icon-symbol";
import useMapStyle from "@/styles/map";
import useMapStore from "@/stores/mapStore";

interface Props {
  activity: Activity,
};

const ActivityDetailMap = ({ activity }: Props) => {
  const mapMode = useMapStore((state) => state.mode);
  const mapStyle = useMapStyle();
  const isAndroid = process.env.EXPO_OS !== 'ios';
  
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <>
      {loading && <ActivityIndicator size="large" />}

      <View style={{ borderRadius: 12, overflow: 'hidden' }}>{/* otherwise android not rounded */}
        <MapView
          style={{
            flex: 1,
            borderRadius: 12,
            height: 200,
          }}
          initialRegion={{
            latitude: activity.location.latitude,
            longitude: activity.location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          customMapStyle={mapStyle}
          onMapReady={() => setLoading(false)}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
          mapType={mapMode}
          toolbarEnabled={false}
        >

          <Marker
            coordinate={{ latitude: activity.location.latitude, longitude: activity.location.longitude }}
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