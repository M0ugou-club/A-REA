import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getFetchUrl() {
  try {
    const url = await AsyncStorage.getItem('fetchUrl');
    return url;
  } catch (error) {
    console.error('Error fetching URL:', error);
    return null;
  }
}