import * as Location from 'expo-location';

export async function getCurrentLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Location permission denied. Please enable in device settings.');
  }
  try {
    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      timeInterval: 5000,
    });
    return {
      latitude:  loc.coords.latitude,
      longitude: loc.coords.longitude,
      accuracy:  loc.coords.accuracy,
    };
  } catch (err) {
    throw new Error('Could not fetch location. Please try again.');
  }
}

export function formatCoords(coords) {
  if (!coords) return 'Unknown';
  return `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
}
