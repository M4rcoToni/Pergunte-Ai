import AsyncStorage from '@react-native-async-storage/async-storage';
import { MESSAGE_COLLECTION } from '../storageConfig';


export async function messageRemoveAll() {
  try {

    await AsyncStorage.removeItem(MESSAGE_COLLECTION);

  } catch (error) {
    console.log('RC', error);
  }
}