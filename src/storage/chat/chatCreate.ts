import AsyncStorage from '@react-native-async-storage/async-storage';
import { chatGetAll } from './chatGetAll';
import { CHAT_COLLECTION } from '../storageConfig';
import { ChatStorageDTO } from './ChatStorageDTO';
import { messageCreate } from '../message/messageCreate';
import { ChatProps } from '../../components/Modal/ChatsArea';
import { messageGetAll } from '../message/messageGetAll';

export async function chatCreate(newChat: ChatStorageDTO, id: string) {
  try {
    // const storageChat = await chatGetAll(id);

    const storage = JSON.stringify(newChat);
    await AsyncStorage.setItem(`${CHAT_COLLECTION}-${id}`, storage);
    const messages = await messageGetAll()

    const already = messages.filter(message => message.chatid === newChat.chatid)

    if (already.length > 0) {
      return console.log('ja esta cad');
    }

    const firstChat: ChatProps = {
      chatid: newChat.chatid,
      title: newChat.title
    }

    await messageCreate(firstChat);

  } catch (error) {
    throw error;
  }
}