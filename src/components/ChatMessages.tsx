import React from 'react';
import { FlatList, View, Text } from 'react-native';

import { MotiText } from 'moti';
import TypeWriter from 'react-native-typewriter';
interface Props {
  data: string[];
}

export function ChatMessages({ data }: Props) {
  return (
    <View className='flex-1'>
      {
        data &&
        <FlatList
          className='flex-1 py-3'
          data={data}
          renderItem={({ item, index }) => (
            <>
              {
                index % 2 !== 1 ?
                  <Text
                    key={item}
                  >
                    {item}
                  </Text>
                  :
                  <TypeWriter
                    key={item}
                    typing={1}
                  >
                    {item}
                  </TypeWriter >
              }
            </>
          )}
          ListEmptyComponent={() => (

            <MotiText
            >
              Olá, eu sou o GPT,{"\n"} como posso te ajudar?
            </MotiText>
          )}
        />
      }
    </View>
  );
}