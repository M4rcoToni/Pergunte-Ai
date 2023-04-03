import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatGetAll } from './chatGetAll';
import { CHAT_COLLECTION } from '../storageConfig';
import { ChatStorageDTO } from './ChatStorageDTO';

export async function chatCreate(newChat: ChatStorageDTO, id: string) {
  try {
    // const storageChat = await chatGetAll(id);

    const storage = JSON.stringify(newChat);
    await AsyncStorage.setItem(`${CHAT_COLLECTION}-${id}`, storage);
    console.log('Storage', storage);

  } catch (error) {
    throw error;
  }
}