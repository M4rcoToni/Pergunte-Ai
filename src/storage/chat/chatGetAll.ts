import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAT_COLLECTION } from '../storageConfig';
// import { ChatStorageDTO } from './ChatStorageDTO';
export type ChatStorageDTO = {
  title: string;
  chatid: string;
  data: string[];
}
export async function chatGetAll(id: string) {
  try {
    const storage = await AsyncStorage.getItem(`${CHAT_COLLECTION}-${id}`);

    const chat: ChatStorageDTO[] = storage ? JSON.parse(storage) : [];
    console.log("get", chat);

    return chat;
  } catch (error) {
    throw error;
  }
}