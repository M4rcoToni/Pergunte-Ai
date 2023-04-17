import React from 'react';
import { FlatList, View, Text } from 'react-native';

import { styles } from './styles';
interface Props {
  data: string[];
}

export function ChatText({ data }: Props) {
  return (
    <View style={styles.container}>
      {data &&
        <FlatList
          style={styles.scroll}
          data={data}
          contentContainerStyle={data.length == 0 ? styles.containerEmpty : null}
          renderItem={({ item, index }) => (
            <Text
              key={item}
              style={[
                styles.responsee,
                index % 2 !== 1 ? styles.description : null,
              ]}
            >
              {item}
            </Text>
          )}
          ListEmptyComponent={() => (

            <Text style={styles.empty}>
              Olá, eu sou o GPT,{"\n"} como posso te ajudar?
            </Text>
          )}
        />
      }
    </View>
  );
}