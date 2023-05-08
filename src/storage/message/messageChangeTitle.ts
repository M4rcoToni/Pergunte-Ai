import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAT_COLLECTION, MESSAGE_COLLECTION } from '../storageConfig';

import { messageGetAll } from './messageGetAll';

import { ChatProps } from '../../screens/Home';

export async function messageChangeTitle(chatId: string, title: string) {
  try {
    const storageMessages = await messageGetAll();
    const storage: ChatProps = JSON.parse(await AsyncStorage.getItem(`${CHAT_COLLECTION}-${chatId}`) ?? '{}');

    const i = {
      chatid: storage.chatid,
      createdAt: storage.createdAt,
      title: title
    }

    const messages = storageMessages.findIndex((id) => id.chatid === storage.chatid);
    storageMessages[messages] = i;

    await AsyncStorage.setItem(MESSAGE_COLLECTION, JSON.stringify(storageMessages));

  } catch (error) {
    console.log('Mgt', error);
  }
}