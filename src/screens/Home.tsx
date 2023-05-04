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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Loading } from '../components/Loading';
import Animated, { FadeIn, FadeOut, Layout } from 'react-native-reanimated';
import { messageChangeTitle } from '../storage/message/messageChangeTitle';

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

      await messageRemoveChat(chatid);

      setMessage(prev => prev.filter(item => item.chatid !== chatid))
      setVisible(true);

    } catch (error) {
      console.log('ErrorRemove', error);
    } finally {
    }
  }

  console.log(visible);

  async function handleChangeTitle(chatid: string, title: string) {
    try {
      await messageChangeTitle(chatid, title);
      fetchMessagesData();
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
          <MotiView
            className='flex-1'
          >
            <Animated.FlatList
              data={message}
              layout={Layout}
              keyExtractor={(item) => item.chatid}
              contentContainerStyle={[message.length === 0 && { flex: 1, justifyContent: 'center' }, { paddingBottom: 130 }]}
              renderItem={({ item, index }) => (
                <Animated.View
                  layout={Layout}
                >
                  <Card
                    chatid={item.chatid}
                    title={item.title}
                    createdAt={item.createdAt}
                    isActive={index == 0 && true}
                    visible={true}
                    changeTitle={() => handleChangeTitle(item.chatid, '')}
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
          </MotiView>
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