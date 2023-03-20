import React, { useState } from 'react';
import { Text, SafeAreaView, View, ScrollView } from 'react-native';
import { SendArea } from '../../components/SendArea';

import { styles } from './styles';
const CHAT_GPD_API_KEY = process.env.CHAT_GPD_API_KEY;

export function Chat() {

  const [description, setDescription] = useState('');
  const [editable, setEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  async function handlefetchDataOpenAi() {
    const prompt = description.trim();
    try {
      const response = await fetch("https://api.openai.com/v1/engines/text-davinci-002/completions", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CHAT_GPD_API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          temperature: 0.5,
          max_tokens: 100,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });
      const data = await response.json();
      if (data && data.choices && data.choices.length > 0) {
        const response = data.choices[0].text;
        setResponse(response);
      } else {
        console.log('Erro', 'Não foi possível.');
      }
    } catch (error) {
      console.log(error);
    }
    console.log(response);

  }




  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} >
        <Text style={styles.responsee}>{response}</Text>

      </ScrollView>
      <View style={styles.content} >
        <SendArea
          placeholder='Digite sua pergunta'
          value={description}
          onChangeText={setDescription}
          onClear={handlefetchDataOpenAi}
        />
      </View>

    </SafeAreaView>
  );
}
