import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, TouchableOpacity, TextInput, findNodeHandle } from 'react-native';
import { MotiText } from 'moti';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import TypeWriter from 'react-native-typewriter';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import { chatGetAll } from '../storage/chat/chatGetAll';

import { Icon } from '../components/Icon';
import { chatCreate } from '../storage/chat/chatCreate';
import { Input } from '../components/Input';
import { Alert } from '../components/Alert';
import dayjs from 'dayjs';
import { Message } from '../components/Message';
import { MessageStorageDTO } from '../storage/chat/ChatStorageDTO';
import { getDay } from '../utils/dayjs';

type RouteParams = {
  chatid: string;
  title: string;
}

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

export function Chat() {
  const route = useRoute();
  const param = route.params as RouteParams;
  const navigation = useNavigation();

  const [description, setDescription] = useState('');
  const [editable, setEditable] = useState(false);
  const [response, setResponse] = useState<MessageStorageDTO[]>([]);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  async function handlefetchDataOpenAi() {
    const prompt = description.trim();
    const time = getDay({ format: 'HH:mm' });

    if (prompt.length < 10) {
      setIsAlertVisible(true)
      return
    }
    try {

      setResponse(prevResponses => [...prevResponses, { message: prompt, createdAt: time }]);
      setTimeout(() => {

        setResponse(prevResponses => [...prevResponses, { message: prompt.trim(), createdAt: getDay({ format: 'HH:mm' }) }]);
      }, 10000);
    } catch (error) {
      console.log(error);
    }
    setDescription('');
    setEditable(false);

    // try {
    //   const response = await fetch("https://api.openai.com/v1/engines/text-davinci-003/completions", {
    //     method: 'POST',
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       prompt: prompt,
    //       temperature: 0.5,
    //       max_tokens: 100,
    //       top_p: 1,
    //       frequency_penalty: 0,
    //       presence_penalty: 0,
    //     }),
    //   });
    //   const data = await response.json();
    //   if (data && data.choices && data.choices.length > 0) {
    //     const responseText = data.choices[0].text;


    //   } else {
    //     console.log('Erro', 'Não foi possível.');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(response);
    // setEditable(true);
  }

  async function fechtData(chatid: string) {
    try {
      const chatData = await chatGetAll(chatid);
      const response = chatData.data;
      console.log('GET IN CHAT', response)
      if (response) {
        setResponse(response)
      }

    } catch (error) {
      console.log('get error', error);
    }
  }

  async function saveData() {
    try {
      const chat = await chatGetAll(param.chatid)
      await chatCreate(
        {
          title: chat.title,
          chatid: param.chatid,
          data: response,
          createdAt: chat.createdAt
        }
        , param.chatid)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (param != undefined) {
      fechtData(param.chatid)
    }
  }, []);

  useEffect(() => {
    saveData()
  }, [response]);

  return (
    <View className='flex-1'>
      <LinearGradient
        colors={['#00a5ce', '#b000c3']}
        start={[0, 0]}
        end={[1, 0]}
        className=' flex-1 '
      >
        <View className='h-24 flex-row pt-4 px-4  items-center'>
          <Icon
            className='h-12 w-12'
            background='bg-trans-100'
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Feather
              name="arrow-left"
              size={24}
              color="white"
            />
          </Icon>
          <MotiText className='pl-6 font-bold text-white text-xl tracking-wider'>
            {param.title}
          </MotiText>
        </View>
        {
          response.length ?
            <FlatList
              className='flex-1 py-6 px-3 rounded-t-3xl bg-gray-back '
              data={response}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Message
                  key={index}
                  createdAt={item.createdAt}
                  message={item.message}
                  response={index % 2 !== 1}
                />
              )}
              contentContainerStyle={[response.length === 0 && { flex: 1, justifyContent: 'center' }, { paddingBottom: 140 }]}
              showsVerticalScrollIndicator={false}
            />
            :
            <View className='flex-1 rounded-t-3xl bg-gray-back justify-center items-center'>
              <MotiText
                className='text-3xl self-center text-white font-extrabold tracking-wider mb-20'
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                Bem vindo,{'\n'}
                <MotiText className='font-regular text-2xl'>
                  como posso te ajudar?
                </MotiText>
              </MotiText>
            </View>

        }
        <View className='absolute bottom-5 mb-3 mx-4 '>
          <Input
            editable={editable}
            onChangeText={setDescription}
            value={description}
            onPress={handlefetchDataOpenAi}
          />
        </View>
      </LinearGradient>
      <Alert
        visible={isAlertVisible}
        onConfirmPressed={() => setIsAlertVisible(false)}
        title={'Atenção'}
        message={'Digite uma pergunta'}
        confirmText={'Ok'}
      />
    </View>
  );
}
