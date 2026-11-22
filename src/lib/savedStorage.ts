import AsyncStorage from '@react-native-async-storage/async-storage';

// One key for the whole list of saved ids
export const SAVED_KEY = 'saved-event-ids';

export async function loadSavedIds(): Promise<number[]> {
  const text = await AsyncStorage.getItem(SAVED_KEY);
  // First launch: nothing has been stored yet
  if (text === null) {
    return [];
  }
  try {
    const value = JSON.parse(text);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

// AsyncStorage keeps strings only, so the array goes in as JSON
export async function storeSavedIds(ids: number[]): Promise<void> {
  await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(ids));
}
