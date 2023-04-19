import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { messageGetAll } from '../../../storage/message/messageGetAll';
import { Button } from '../Button';
import { messageCreate } from '../../../storage/message/messageCreate';
import uuid from 'react-native-uuid';
import { Message } from '../../Message';
import { messageRemoveChat } from '../../../storage/message/messageRemoveChat';
import { MotiText } from 'moti';
import { chatCreate } from '../../../storage/chat/chatCreate';

export interface ChatProps {
  title: string;
  chatid: string;
}

type Props = {
  items: ChatProps[];
}

export function ChatsArea() {
  const navigation = useNavigation();
  const [message, setMessage] = useState<ChatProps[]>([]);

  async function fetchMessagesData() {
    try {
      const data = await messageGetAll();
      console.log('CHAT AREA', data);
      setMessage(data)
    } catch (error) {
      console.log('CHAT AREA ERROR', error);
    }
  }

  async function handleCreateItem() {
    const id = uuid.v4();

    const newMessage: ChatProps = {
      title: 'Novo Chat',
      chatid: id.toString(),
    }
    addFirstItem(newMessage)
  }

  async function addFirstItem(message: ChatProps) {
    try {
      await messageCreate(message);

      await chatCreate({
        chatid: message.chatid,
        title: message.title,
        data: []
      }, message.chatid)

      setMessage(prev => [...prev, message])
    } catch (error) {
      console.log('Modal', error);
    }
  }

  async function handleRemoveChat(chatid: string) {
    try {
      await messageRemoveChat(chatid);
      setMessage(prev => prev.filter(item => item.chatid !== chatid))
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchMessagesData()
  }, []);

  return (
    <>
      <Button
        onPress={handleCreateItem}
      />
      <FlatList style={styles.container}
        data={message}
        keyExtractor={item => item.chatid}
        renderItem={({ item }) =>
          <Message
            title={item.title}
            chatid={item.chatid}
            onPress={() => handleRemoveChat(item.chatid)}
          />
        }
        ListEmptyComponent={() => {
          return (
            <MotiText
              style={styles.text}
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 100,
              }}
            >
              Crie seu primeiro chat
            </MotiText>
          )
        }}
      />
    </>
  );
}