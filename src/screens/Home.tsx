import { useState, useCallback } from 'react';
import { View, SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MotiView, } from 'moti';
import dayjs from 'dayjs';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons';
import Animated, { Layout } from 'react-native-reanimated';

import uuid from 'react-native-uuid';
import { messageGetAll } from '../storage/message/messageGetAll';
import { messageCreate } from '../storage/message/messageCreate';
import { chatCreate } from '../storage/chat/chatCreate';
import { messageRemoveChat } from '../storage/message/messageRemoveChat';
import { messageChangeTitle } from '../storage/message/messageChangeTitle';

import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { Loading } from '../components/Loading';
import { ChatStorageDTO } from '../storage/chat/ChatStorageDTO';

export type ChatProps = {
  title: string;
  chatid: string;
  createdAt: string;
}

export function Home() {

  const [message, setMessage] = useState<ChatProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const time = dayjs().format('DD/MM/YYYY');

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
    try {
      const id = uuid.v4();
      console.log(time);

      const newMessage: ChatStorageDTO = {
        title: 'Novo Chat',
        chatid: id.toString(),
        data: [],
        createdAt: time
      }

      await messageCreate(newMessage);

      await chatCreate(newMessage, id.toString())

      setMessage(prev => [...prev, newMessage])
    } catch (error) {
      console.log(error);
    }
  }

  async function fecheData() {
    try {
      const data = await messageGetAll();
      setMessage(data)
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchMessagesData()
  }, []));

  return (
    <SafeAreaView className='flex-1 bg-gray-back pt-10 px-6'>
      <Header />
      {
        isLoading ?
          <View className='flex-1'>
            <Animated.FlatList
              data={message}
              layout={Layout}
              keyExtractor={(item) => item.chatid}
              contentContainerStyle={[message.length === 0 && { flex: 1, justifyContent: 'center' }, { paddingBottom: 130 }]}
              renderItem={({ item, index }) => (
                <Card
                  chatid={item.chatid}
                  title={item.title}
                  createdAt={item.createdAt}
                  isActive={index == 0 && true}
                  changeCard={fecheData}
                />
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
          duration: 500,
        }}
      >
        <Icon
          className='h-16 w-16 shadow-lg shadow-purple-700'
          background='bg-purple-mid'
          activeOpacity={0.9}
          onPress={handleCreateItem}
        >
          <Feather
            name='plus'
            size={24}
            color={colors.zinc[200]}
          />
        </Icon>
      </MotiView>
    </SafeAreaView>
  )
}