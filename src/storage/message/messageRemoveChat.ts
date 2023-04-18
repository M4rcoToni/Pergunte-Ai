import AsyncStorage from '@react-native-async-storage/async-storage';
import { messageGetAll } from './messageGetAll';
import { CHAT_COLLECTION } from '../storageConfig';


export async function messageRemoveChat(chatId: string) {
  try {
    const storageMessages = await messageGetAll();
    const storageMessagesFiltered = storageMessages.filter((message) => message.chatid !== chatId);

    await AsyncStorage.setItem('messages', JSON.stringify(storageMessagesFiltered));

    await AsyncStorage.removeItem(`${CHAT_COLLECTION}-${chatId}`);

  } catch (error) {
    console.log('RC', error);
  }
}