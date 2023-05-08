import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAT_COLLECTION, MESSAGE_COLLECTION } from '../storageConfig';

import { messageGetAll } from './messageGetAll';

export async function messageRemoveChat(chatId: string) {
  try {
    const storageMessages = await messageGetAll();
    const storageMessagesFiltered = storageMessages.filter((message) => message.chatid !== chatId);

    await AsyncStorage.setItem(MESSAGE_COLLECTION, JSON.stringify(storageMessagesFiltered));

    await AsyncStorage.removeItem(`${CHAT_COLLECTION}-${chatId}`);

  } catch (error) {
    console.log('RC', error);
  }
}