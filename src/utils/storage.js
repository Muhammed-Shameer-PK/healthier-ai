import * as SecureStore from 'expo-secure-store';

const MAX_VALUE_SIZE = 2000; // expo-secure-store 2 KB limit per key

export async function saveItem(key, value) {
  const str = JSON.stringify(value);
  await SecureStore.setItemAsync(key, str);
}

export async function getItem(key) {
  try {
    const raw = await SecureStore.getItemAsync(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function removeItem(key) {
  await SecureStore.deleteItemAsync(key);
}
