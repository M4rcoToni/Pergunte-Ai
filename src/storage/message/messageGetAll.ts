import AsyncStorage from '@react-native-async-storage/async-storage';
import { MESSAGE_COLLECTION } from '../storageConfig';

import { ChatProps } from '../../screens/Home';

export async function messageGetAll() {
  try {
    const storage = await AsyncStorage.getItem(MESSAGE_COLLECTION);

    const messages: ChatProps[] = storage ? JSON.parse(storage) : [];
    console.log('MGA', messages);

    return messages;

  } catch (error) {
    throw 'MG Error' + error;
  }
}