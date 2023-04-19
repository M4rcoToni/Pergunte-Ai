import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Alert, TouchableOpacity } from 'react-native';
import { ChatText } from '../../components/ChatText';
import { Header } from '../../components/Header';
import { SendArea } from '../../components/SendArea';

import { styles } from './styles';
import { Modal } from '../../components/Modal/Index';
import { ChatProps } from '../../components/Modal/ChatsArea/index';
import uuid from 'react-native-uuid';
import { chatCreate } from '../../storage/chat/chatCreate';
import { ChatStorageDTO } from '../../storage/chat/ChatStorageDTO';
import { chatGetAll } from '../../storage/chat/chatGetAll';
import { messageCreate } from '../../storage/message/messageCreate';

type RouteParams = {
  chatid: string;
}

const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

export function Chat() {
  const route = useRoute();
  const param = route.params as RouteParams;

  const [description, setDescription] = useState('');
  const [firstUuid, setUuid] = useState('');
  const [editable, setEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string[]>([]);
  const [firstPrompt, setFirstResponse] = useState<string | undefined>();

  const [lastParam, setLastParam] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => { setModalVisible(prev => !prev); };



  const newChat: ChatStorageDTO[] = firstPrompt ? [
    {
      title: firstPrompt,
      chatid: firstUuid,
      data: response
    }
  ] : [];

  async function handlefetchDataOpenAi() {
    const prompt = description.trim();
    const id = uuid.v4();

    if (!firstPrompt) {
      setUuid(id.toString())
      setFirstResponse(prompt);
    }

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

  async function saveData() {
    console.log('res', response);

    if (response.length && !param) {
      console.log('if1', firstUuid);

      await chatCreate(newChat[0], firstUuid)
    }
    if (!firstUuid && param) {
      console.log('dif id');
      console.log('if2', param.chatid);
      const chat = await chatGetAll(param.chatid)
      await chatCreate(
        {
          chatid: param.chatid
          , title: chat.title
          , data: response
        }
        , param.chatid)

    }
    if (param && response) {
      console.log('if3');
      const chat = await chatGetAll(param.chatid)
      await chatCreate(
        {
          chatid: param.chatid
          , title: chat.title
          , data: response
        }
        , param.chatid)
    }

    console.log('not save');

  }

  async function fechtData(id: string) {
    try {

      const chatData = await chatGetAll(id);
      const response = chatData.data;
      console.log('GET IN CHAT', response)
      setResponse(response)

    } catch (error) {
      console.log('get error', error);
    }
  }

  useEffect(() => {
    if (param) {
      if (lastParam !== null && param.chatid !== lastParam) {

        fechtData(param.chatid)
      }
      setLastParam(param.chatid);
    }
  }, [param, lastParam]);

  useEffect(() => {
    saveData()
  }, [response]);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        onClose={handleOpenModal}
      />
      <Header
        onPress={handleOpenModal}
      />

      {/* loading */}
      <ChatText data={response} />

      <View style={styles.content} >
        <SendArea
          placeholder='Digite sua pergunta'
          value={description}
          onChangeText={setDescription}
          onClear={handlefetchDataOpenAi}
          editable={editable}
        />
      </View>

    </SafeAreaView>
  );
}
