import { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MotiView } from 'moti';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons';

import uuid from 'react-native-uuid';
import { messageGetAll } from '../storage/message/messageGetAll';
import { messageCreate } from '../storage/message/messageCreate';
import { chatCreate } from '../storage/chat/chatCreate';
import { messageRemoveChat } from '../storage/message/messageRemoveChat';

import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { useFocusEffect } from '@react-navigation/native';
import { Loading } from '../components/Loading';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';

export type ChatProps = {
  title: string;
  chatid: string;
  createdAt: string;
}

export function Home() {
  const [message, setMessage] = useState<ChatProps[]>([]);
  const [visible, setVisible] = useState(true);
  const [removeId, setRemoveId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const date = new Date;
  const time = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

  async function fetchMessagesData() {
    try {
      setIsLoading(false);
      const data = await messageGetAll();
      // console.log('CHAT AREA', data);
      setMessage(data)
    } catch (error) {
      console.log('CHAT AREA ERROR', error);
    } finally {
      setIsLoading(true);
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
      setRemoveId(chatid);
      console.log('remove');

      await messageRemoveChat(chatid);
      setVisible(true);

      setMessage(prev => prev.filter(item => item.chatid !== chatid))
    } catch (error) {
      console.log('ErrorRemove', error);
    } finally {
    }
  }
  console.log(visible);

  useFocusEffect(useCallback(() => {
    fetchMessagesData()
  }, []));

  return (
    <SafeAreaView className='flex-1 bg-gray-back pt-10 px-6'>
      <Header />
      {
        isLoading ?
          <View>
            <FlatList
              data={message}
              keyExtractor={(item) => item.chatid}
              contentContainerStyle={{ paddingBottom: 130 }}
              renderItem={({ item, index }) => (
                <Animated.View
                  layout={Layout}
                >
                  <Card
                    chatid={item.chatid}
                    title={item.title}
                    createdAt={item.createdAt}
                    isActive={index == 0 && true}
                    visible={removeId === item.chatid}
                    removeChat={() => handleRemoveChat(item.chatid)}
                  />
                </Animated.View>
              )
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <ListEmpty />
              )}
            />
          </View>
          :
          <Loading />
      }
      <MotiView
        className=' absolute bottom-0 right-0 mb-8 mr-5'
        from={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          type: 'timing',
          duration: 400,
        }}
      >
        <Icon
          className='h-16 w-16'
          background='bg-purple-mid'
          activeOpacity={0.9}
          onPress={handleCreateItem}
        >
          <Feather
            name='plus'
            size={24}
            color={colors.zinc[300]}
          />
        </Icon>
      </MotiView>
    </SafeAreaView>
  )
}