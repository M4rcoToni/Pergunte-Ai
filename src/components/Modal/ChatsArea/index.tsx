import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export interface ChatProps {
  title: string;
  chatid: string;
}
type Props = {
  items?: ChatProps[];
}

export function ChatsArea({ items }: Props) {
  const navigation = useNavigation();

  return (
    <FlatList style={styles.container}
      data={items}
      keyExtractor={item => item.title}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.chat}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Chat', { chatid: item.chatid })}
        >
          <Feather name={"message-square"} size={20} color="#737380" />
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
      )}
    >

    </FlatList>
  );
}