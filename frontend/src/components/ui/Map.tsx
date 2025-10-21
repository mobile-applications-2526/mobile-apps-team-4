import useGlobalStyles from "@/styles/global";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { IconSymbol } from "./icon-symbol";
import { MapPin } from "@/types";
import { router } from "expo-router";
import { BlurView } from 'expo-blur';

interface Props {
  markers?: MapPin[],
};

const Map = ({ markers }: Props) => {
  const styles = useGlobalStyles();

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 50.88,
        longitude: 4.7,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >

      {markers && markers.map((m, i) => (
        <Marker
          key={i}
          coordinate={{ latitude: m.coordinates.lat, longitude: m.coordinates.lon }}
          title={m.title}
          onPress={() => router.push('/(modals)/joinActivity')}
        >

          {m.icon && (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 50,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <BlurView
                  intensity={50}
                  tint="light"
                  style={StyleSheet.absoluteFill}
                />

                  <IconSymbol size={30} name={m.icon.name} color={m.icon.color} />
            </View>
                {/* <BlurView intensity={100} tint="default">

                </BlurView> */}

            </View>
          )}

        </Marker>
      ))}

    </MapView>
  );
};

export default Map;



const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedBox: {
    width: 200,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden', // This is crucial for rounded corners
    justifyContent: 'center',
    alignItems: 'center',
  },
});