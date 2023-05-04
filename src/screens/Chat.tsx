import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView, View, Alert, FlatList, Text, TouchableOpacity } from 'react-native';
import { MotiText } from 'moti';
import { useNavigation, useRoute } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import TypeWriter from 'react-native-typewriter';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import { chatGetAll } from '../storage/chat/chatGetAll';

import { SendArea } from '../components/SendArea';
import { Icon } from '../components/Icon';
import { chatCreate } from '../storage/chat/chatCreate';
import { Input } from '../components/Input';


type RouteParams = {
  chatid: string;
}

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

export function Chat() {
  const route = useRoute();
  const param = route.params as RouteParams;
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [editable, setEditable] = useState(true);
  const [response, setResponse] = useState<string[]>([]);

  const date = new Date;
  const time = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();

  async function handlefetchDataOpenAi() {
    const prompt = description.trim();
    const id = uuid.v4();

    try {
      if (prompt.trim().length === 0 || !prompt) {
        Alert.alert('ChatGPT', 'Digite uma pergunta');
      } else {
        setResponse(prevResponses => [...prevResponses, prompt]);
        setResponse(prevResponses => [...prevResponses, prompt.trim()]);
        console.log('pro', prompt);
      }
    } catch (error) {
      console.log(error);
    }
    setDescription('');

    // setEditable(false);
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
      const chatData = await chatGetAll(param.chatid);
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
    const chat = await chatGetAll(param.chatid)
    await chatCreate(
      {
        title: chat.title,
        chatid: param.chatid,
        data: response,
        createdAt: time
      }
      , param.chatid)
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
    <SafeAreaView className='flex-1'>
      <LinearGradient
        colors={['#00a5ce', '#b000c3']}
        start={[0, 0]}
        end={[1, 0]}
        className=' flex-1 '
      >
        <View className='h-32 flex-row py-7 px-4'>
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
        </View>
        {
          response &&
          <FlatList
            className='flex-1 py-6 px-3 rounded-t-3xl bg-gray-back '
            data={response}
            renderItem={({ item, index }) => (
              <>
                {
                  index % 2 !== 1 ?
                    <View className='flex-wrap-reverse'>
                      <View
                        className='bg-gray-600  m-3 p-4 rounded-t-2xl rounded-l-2xl items-end '
                      >
                        <Text
                          key={index}
                          className='text-white font-regular text-base'
                        >
                          {item}
                        </Text>
                      </View>
                    </ View>
                    :
                    <View className='flex-wrap'>
                      <View
                        className='bg-gray-500  flex-wrap m-3 p-4 rounded-t-2xl rounded-r-2xl '
                      >
                        <TypeWriter
                          key={index}
                          className='text-white font-regular text-base'
                          typing={1}
                        >
                          {item}
                        </TypeWriter >
                      </View>
                    </View>
                }
              </>
            )}
            contentContainerStyle={[response.length === 0 && { flex: 1, justifyContent: 'center' }, { paddingBottom: 130 }]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <MotiText
                className='text-3xl self-center text-white font-extrabold tracking-wider '
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ type: 'timing', duration: 1000 }}
              >
                Bem vindo, {"\n"}como posso te ajudar?
              </MotiText>
            )}
          />
        }
        <View className='absolute bottom-5 mb-3 mx-4 '>
          {/* arrumar rerenders */}
          <Input />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
