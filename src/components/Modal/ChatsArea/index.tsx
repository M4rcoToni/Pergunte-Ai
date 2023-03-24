import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

interface Item {
  title: string;
  icon: string;
}


export function ChatsArea() {
  const icon = "message-square";

  const items: Item[] = [
    { title: "Expo dev.", icon },
    { title: "Listagem em Tópicos.", icon },
    { title: "Expense Array Creation.", icon },
    { title: "Context API no React.", icon },
  ];

  return (
    <FlatList style={styles.container}
      data={items}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chat}
          activeOpacity={0.7}
        >
          <Feather name={item.icon} size={20} color="#737380" />
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
    >

    </FlatList>
  );
}