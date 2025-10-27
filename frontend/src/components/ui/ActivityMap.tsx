import useGlobalStyles from "@/styles/global";
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, useColorScheme } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconSymbol } from "./icon-symbol";
import { Activity } from "@/types";
import { router } from "expo-router";
import { BlurView } from 'expo-blur';
import { useEffect, useRef, useState } from "react";
import useMapStyle from "@/styles/map";
import * as Location from "expo-location";
import { Colors } from "@/constants/theme";

interface Props {
  activities?: Activity[],
  location?: Location.LocationObject,
};

const ActivityMap = ({ activities, location }: Props) => {
  const styles = useGlobalStyles();
  const isDark = useColorScheme() === 'dark';
  const isAndroid = process.env.EXPO_OS !== 'ios';
  const mapStyle = useMapStyle();
  const mapRef = useRef<MapView>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isAtMyLocation, setIsAtMyLocation] = useState<boolean>(true);

  useEffect(() => { // go to user location first time they open map
    if (location && mapRef.current && isAtMyLocation) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.018,
        longitudeDelta: 0.018,
      });
    }
  }, [location]);

  const handleGoToLocation = () => {
    if (!location || !mapRef) return;

    mapRef.current?.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    });

    setIsAtMyLocation(true);
  };

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
          showsUserLocation={true}
          customMapStyle={mapStyle}
          onMapReady={() => setLoading(false)}
          rotateEnabled={false}
          pitchEnabled={false}
          showsMyLocationButton={false}
          onPanDrag={() => setIsAtMyLocation(false)}
          ref={mapRef}
        >

          {activities && activities.map((a, i) => (
            <Marker
              key={i}
              coordinate={{ latitude: a.location.latitude, longitude: a.location.longitude }}
              // title={a.title} // otherwise shows pop up
              onPress={() => router.push(`/(modals)/activityDetails/${a.id}`)}
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

                    <IconSymbol size={isAndroid ? 22 : 30} name={a.icon.name} color={a.icon.color} />
                </View>
              )}

            </Marker>
          ))}

        </MapView>

        <TouchableOpacity
          onPress={handleGoToLocation}
          style={[
            {
              position: 'absolute',
              right: 5,
              borderRadius: 8,
              overflow: 'hidden',
              padding: 8,
              backgroundColor: styles.container.backgroundColor,
            },
            isAndroid ? {
              bottom: 5,
            } : {
              top: 5,
            },
          ]}
        >
          <IconSymbol
            name={isAtMyLocation ? "location.fill" : "location"}
            size={28}
            color={isDark ? Colors.dark.icon : Colors.light.icon}
          />
        </TouchableOpacity>

      </View>
    </>
  );
};

export default ActivityMap;