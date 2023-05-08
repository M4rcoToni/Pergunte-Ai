import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAT_COLLECTION } from '../storageConfig';
import { ChatStorageDTO } from './ChatStorageDTO';

export async function chatGetAll(id: string) {
  try {
    const storage = await AsyncStorage.getItem(`${CHAT_COLLECTION}-${id}`);
    if (!storage) {
      console.log("get null", storage);
    }
    const chat: ChatStorageDTO = storage ? JSON.parse(storage) : [];

    return chat;
  } catch (error) {
    throw error;
  }
}