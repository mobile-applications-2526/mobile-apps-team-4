import useMapStyle from '@/styles/map';
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { MapPressEvent, Marker } from 'react-native-maps';
import Button from './Button';

interface Props {
  setLocation: (location: { latitude: number; longitude: number }) => void;
};

const LocationPicker = ({ setLocation }: Props) => {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const mapStyle = useMapStyle();
  const mapRef = useRef<MapView>(null);

  const handleSelectLocation = (event: MapPressEvent) => {
    if (confirmed) return;

    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleConfirm = () => {
    if (!selectedLocation) return;

    setConfirmed(true);
    mapRef.current?.animateToRegion({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      latitudeDelta: 0.003,
      longitudeDelta: 0.003,
    })

    setLocation(selectedLocation);
  };

  return (
    <View style={{ borderRadius: 12, overflow: 'hidden', minHeight: confirmed ? 150 : 300 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.88,
          longitude: 4.7,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        customMapStyle={mapStyle}
        rotateEnabled={false}
        pitchEnabled={false}
        zoomEnabled={!confirmed}
        scrollEnabled={!confirmed}
        onPress={handleSelectLocation}
        ref={mapRef}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
          />
        )}
      </MapView>

      {selectedLocation && (
        <View style={{ position: 'absolute', bottom: -1, left: 3, right: 3 }}>
          <Button
            label={confirmed ? 'Pick another location' : 'Confirm Location'}
            onPress={confirmed ? () => setConfirmed(false) : handleConfirm}
            highlight={!confirmed}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  confirmContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
  },
});

export default LocationPicker;