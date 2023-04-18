import AsyncStorage from '@react-native-async-storage/async-storage';
import { MESSAGE_COLLECTION } from '../storageConfig';
import { ChatStorageDTO } from '../chat/ChatStorageDTO';
import { messageGetAll } from './messageGetAll';
import { ChatProps } from '../../components/Modal/ChatsArea';

export async function messageCreate(messages: ChatProps) {
  try {

    const storageMessages = await messageGetAll();

    const storage = JSON.stringify([...storageMessages, messages]);

    console.log('Messages', storage);
    await AsyncStorage.setItem(MESSAGE_COLLECTION, storage);

  } catch (error) {
    throw 'MC' + error;
  }
}