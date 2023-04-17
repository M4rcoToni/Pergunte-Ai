import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { messageGetAll } from '../../../storage/message/messageGetAll';

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
      const response = data[0];
      console.log('CHAT AREA', response);
      setMessage(response);
    } catch (error) {
      console.log('CHAT AREA', error);
    }
  }

  useEffect(() => {
    fetchMessagesData()
  }, []);

  return (
    <>
      {
        message !== undefined &&
        <FlatList style={styles.container}
          data={message}
          keyExtractor={item => item.chatid}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chat}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Chat', { chatid: item.chatid })}
            >
              <Feather name={"message-square"} size={20} color="#737380" />
              <Text style={styles.text}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={() => {
            return (
              <Text >Nenhum chat encontrado</Text>
            )
          }}
        />

      }
    </>
  );
}