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
import useMapStore from "@/stores/mapStore";

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
  const mapMode = useMapStore((state) => state.mode);
  const setMapMode = useMapStore((state) => state.setMode);
  
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
          toolbarEnabled={false}
          mapType={mapMode}
          ref={mapRef}
        >

          {activities?.map(a => (
            <Marker
              key={a.id}
              coordinate={{ latitude: a.location.latitude, longitude: a.location.longitude }}
              // title={a.name} // otherwise shows pop up
              onPress={() => router.push(`/(modals)/activityDetails/${a.id}`)}
              style={{ width: 40, height: 40 }}
            >

              {a.icon && (
                <View style={[
                  {
                    width: isAndroid ? 33 : 40,
                    height: isAndroid ? 33 : 40,
                    borderRadius: 50,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: a.icon.color,
                  },
                  isAndroid && {
                    backgroundColor: styles.container.backgroundColor,
                  },
                ]}>
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

        <View style={[
          styles.shadow,
          {
            position: 'absolute',
            right: 5,
            borderRadius: 8,
            backgroundColor: styles.container.backgroundColor,
          },
          isAndroid ? {
            flexDirection: 'column-reverse',
            bottom: 5,
          } : {
            top: 5,
          },
        ]}>
          <TouchableOpacity
            onPress={handleGoToLocation}
            style={{ padding: 8 }}
          >
            <IconSymbol
              name={isAtMyLocation ? "location.fill" : "location"}
              size={28}
              color={isAtMyLocation
                ? isDark ? Colors.dark.tint : Colors.light.tint
                : (isDark ? Colors.dark.icon : Colors.light.icon)
              }
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMapMode(mapMode === 'standard' ? 'hybrid' : 'standard')}
            style={[
              { padding: 8, borderColor: styles.borderColor.borderColor },
              isAndroid ? { borderBottomWidth: 1 } : { borderTopWidth: 1 },
            ]}
          >
            <IconSymbol
              name={"map.fill"}
              size={28}
              color={isDark ? Colors.dark.icon : Colors.light.icon}
            />
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
};

export default ActivityMap;