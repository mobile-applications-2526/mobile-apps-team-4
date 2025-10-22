import useGlobalStyles from "@/styles/global";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconSymbol } from "./icon-symbol";
import { Activity } from "@/types";
import { router } from "expo-router";
import { BlurView } from 'expo-blur';
import { useState } from "react";

interface Props {
  activities?: Activity[],
};

const ActivityMap = ({ activities }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const styles = useGlobalStyles();
  const isAndroid = process.env.EXPO_OS !== 'ios';

  return (
    <>
      {loading && <ActivityIndicator size="large" />}

      <View style={{borderRadius: 12, overflow: 'hidden' }}>{/* otherwise android not rounded */}
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
          onMapReady={() => setLoading(false)}
        >

          {activities && activities.map((a, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: a.coordinates.lat, longitude: a.coordinates.lon }}
              // title={a.title} // otherwise shows pop up
              onPress={() => router.push(`/(modals)/joinActivity/${a.id}`)}
              style={{ width: 40, height: 40}}
            >

              {a.icon && (
                <View style={{
                  width: isAndroid ? 33 : 40,
                  height: isAndroid ? 33 : 40,
                  borderRadius: 50,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: a.icon.color,
                }}>
                  <BlurView
                    intensity={50}
                    tint="light"
                    style={StyleSheet.absoluteFill}
                  />

                    <IconSymbol size={isAndroid ? 25 : 30} name={a.icon.name} color={a.icon.color} />
                </View>
              )}

            </Marker>
          ))}

        </MapView>
      </View>
    </>
  );
};

export default ActivityMap;