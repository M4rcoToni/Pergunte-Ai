import AsyncStorage from '@react-native-async-storage/async-storage';
import { MESSAGE_COLLECTION } from '../storageConfig';
export async function messageGetAll() {
  try {
    const storage = await AsyncStorage.getItem(MESSAGE_COLLECTION);

    const message = storage ? JSON.parse(storage) : [];
    console.log('MG', storage);

    return message;

  } catch (error) {
    throw 'MG' + error;
  }
}