import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Pressable } from 'react-native';
import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { MotiView } from 'moti';

type Props = {
  title: string,
  chatid: string
  onPress: () => void;
}
export function Message({ chatid, title, onPress }: Props) {
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);

  const handleShowOptions = () => setEditable(prev => !prev)

  function handleChangeChat() {
    navigation.navigate('Chat', { chatid: chatid })
  }

  return (
    <MotiView
      style={styles.container}
      from={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        delay: 100,
      }}
    >
      <TouchableOpacity
        style={styles.chat}
        onLongPress={handleShowOptions}
        onPress={handleChangeChat}
        activeOpacity={0.5}
      >
        <Feather name={"message-square"} size={20} color="#D5D4D9" />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
      {
        editable &&
        <TouchableOpacity
          style={styles.trash}
          onPress={onPress}
        >
          <Feather name={"trash-2"} size={20} color="#D5D4D9" />
        </TouchableOpacity>
      }
    </MotiView>
  );
}