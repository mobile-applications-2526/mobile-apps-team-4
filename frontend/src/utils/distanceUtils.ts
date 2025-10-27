export const calculateDistance = ({
  coordinate1,
  coordinate2,
  inKm = false,
}: {
  coordinate1: {
    latitude: number,
    longitude: number,
  },
  coordinate2: {
    latitude: number,
    longitude: number,
  },
  inKm?: boolean,
}): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371000;
  const dLat = toRad(coordinate2.latitude - coordinate1.latitude);
  const dLon = toRad(coordinate2.longitude - coordinate1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coordinate1.latitude)) *
      Math.cos(toRad(coordinate2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return inKm ? distance / 1000 : distance;
};

export const calculateAndFormatDistance = ({
  coordinate1,
  coordinate2,
}: {
  coordinate1: {
    latitude: number,
    longitude: number,
  },
  coordinate2: {
    latitude: number,
    longitude: number,
  },
}): string => {
  const distance = calculateDistance({ coordinate1, coordinate2 });

  return distance < 1500 ? `${Math.round(distance)} m` : `${parseFloat((distance / 1000).toFixed(2))} km`
};