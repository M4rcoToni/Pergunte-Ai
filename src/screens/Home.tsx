import { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '../components/Card';
import { Feather } from '@expo/vector-icons';

import { messageGetAll } from '../storage/message/messageGetAll';

import uuid from 'react-native-uuid';
import { messageCreate } from '../storage/message/messageCreate';
import { chatCreate } from '../storage/chat/chatCreate';
import { messageRemoveChat } from '../storage/message/messageRemoveChat';
import { ListEmpty } from '../components/ListEmpty';

export type ChatProps = {
  title: string;
  chatid: string;
  createdAt: string;
}

export function Home() {
  const [message, setMessage] = useState<ChatProps[]>([]);
  const [visible, setVisible] = useState(true);
  const date = new Date;
  const time = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

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

    console.log('DATE', time);

    const newMessage: ChatProps = {
      title: 'Novo Chat',
      chatid: id.toString(),
      createdAt: time
    }
    addFirstItem(newMessage)
  }

  async function addFirstItem(message: ChatProps) {
    try {
      await messageCreate(message);

      await chatCreate({
        chatid: message.chatid,
        title: message.title,
        data: [],
        createdAt: time,
      }, message.chatid)

      setMessage(prev => [...prev, message])
    } catch (error) {
      console.log('Modal', error);
    }
  }

  async function handleRemoveChat(chatid: string) {
    try {
      setVisible(false);
      console.log('remove');

      await messageRemoveChat(chatid);
      setMessage(prev => prev.filter(item => item.chatid !== chatid))
    } catch (error) {
      console.log('ErrorRemove', error);
    }
  }

  useEffect(() => {
    fetchMessagesData()
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-gray-back pt-10 px-6'>
      <View className='pb-6'>
        <TouchableOpacity className='h-12 w-12 rounded-full bg-gray-500 justify-center items-center '>
          <Feather
            name='grid'
            size={20}
            color='white'
          />
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={message}
          keyExtractor={(item) => item.chatid}
          contentContainerStyle={{ paddingBottom: 130 }}
          renderItem={({ item, index }) =>
            <Card
              chatid={item.chatid}
              title={item.title}
              createdAt={item.createdAt}
              isActive={index == 0 && true}

              removeChat={() => handleRemoveChat(item.chatid)}
            />
          }
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty />
          )}
        />
      </View>
      <TouchableOpacity
        className='h-16 w-16 bg-purple-mid justify-center items-center rounded-full absolute bottom-0 right-0 mb-8 mr-5'
        activeOpacity={0.9}
        onPress={handleCreateItem}
      >
        <Feather
          name='plus'
          size={24}
          color='white'
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}