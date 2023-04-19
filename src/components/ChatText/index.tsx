import React from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from './styles';
import { MotiText } from 'moti';
import TypeWriter from 'react-native-typewriter';
interface Props {
  data: string[];
}

export function ChatText({ data }: Props) {
  return (
    <View style={styles.container}>
      {
        data &&
        <FlatList
          style={styles.scroll}
          data={data}
          contentContainerStyle={data.length == 0 ? styles.containerEmpty : null}
          renderItem={({ item, index }) => (
            <>
              {
                index % 2 !== 1 ?
                  <Text
                    key={item}
                    style={[
                      styles.responsee,
                      index % 2 !== 1 ? styles.description : null,
                    ]}
                  >
                    {item}
                  </Text>
                  :
                  <TypeWriter
                    key={item}
                    typing={1}
                    style={[
                      styles.responsee,
                      index % 2 !== 1 ? styles.description : null,
                    ]}
                  >
                    {item}
                  </TypeWriter >
              }
            </>
          )}
          ListEmptyComponent={() => (

            <MotiText
              style={styles.empty}
            >
              Olá, eu sou o GPT,{"\n"} como posso te ajudar?
            </MotiText>
          )}
        />
      }
    </View>
  );
}