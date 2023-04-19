import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../../theme';
interface Botton {
  id: number;
  text: string;
  icon: string;
  onPressed?: () => void;
}
const url = 'https://github.com/M4rcoToni/ChatGPT-Mobile';

export function Footer() {


  const press = useCallback(async () => {
    const supported = await Linking.canOpenURL(url)
    if (supported) {
      await Linking.openURL(url);
    }
  }, [])

  const data: Botton[] = [
    {
      id: 1,
      text: 'Limpar Conversa',
      icon: "trash-2",

    },
    {
      id: 2,
      text: 'Modo Light',
      icon: "sun",

    },
    {
      id: 3,
      text: 'Github',
      icon: "github",
      onPressed: press
    },
  ];
  return (
    <View style={styles.container}>
      {
        data.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.area}
            activeOpacity={0.7}
            onPress={item.onPressed}
          >
            <Feather name={item.icon} size={20} color={THEME.COLORS.GRAY_200} />
            <Text style={styles.text}>{item.text}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
}