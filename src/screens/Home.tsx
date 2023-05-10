import { useState, useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MotiView, } from 'moti';
import colors from 'tailwindcss/colors';
import { Feather } from '@expo/vector-icons';
import Animated, { Layout } from 'react-native-reanimated';

import uuid from 'react-native-uuid';
import { messageGetAll } from '../storage/message/messageGetAll';
import { messageCreate } from '../storage/message/messageCreate';
import { chatCreate } from '../storage/chat/chatCreate';
import { ChatStorageDTO } from '../storage/chat/ChatStorageDTO';
import { messageRemoveAll } from '../storage/message/messageRemoveAll';

import { Card } from '../components/Card';
import { ListEmpty } from '../components/ListEmpty';
import { Header } from '../components/Header';
import { Icon } from '../components/Icon';
import { Loading } from '../components/Loading';
import { Alert } from '../components/Alert';

import { getDay } from '../utils/dayjs';

export type ChatProps = {
  title: string;
  chatid: string;
  createdAt: string;
}

export function Home() {

  const [message, setMessage] = useState<ChatProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const time = getDay({ format: 'DD/MM/YYYY' });

  async function fetchMessagesData() {
    try {
      setIsLoading(false);
      const data = await messageGetAll();

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
      console.log('handleCreateItem', time);

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

  async function handleRemoveMessages() {
    try {
      await messageRemoveAll();
      await fecheData();
    } catch (error) {
      console.log('REMOVE ERROR', error);
    } finally {
      setIsAlertVisible(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchMessagesData()
  }, []));

  return (
    <View className='flex-1 bg-gray-back pt-10 px-6'>
      <Alert
        visible={isAlertVisible}
        onConfirmPressed={() => handleRemoveMessages()}
        onCancelPressed={() => setIsAlertVisible(false)}
        title='Atenção'
        message='Tem certeza que excluir todos os chats?'
        confirmText='Excluir'
        cancelText='Cancelar'
        cancelVisible={true}
      />
      <Header
        removeMessages={() => setIsAlertVisible(true)}
        isActive={message.length > 0}
      />
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
    </View>
  )
}