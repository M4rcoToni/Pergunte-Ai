import React from 'react';
import { View, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
type Props = TouchableOpacityProps & {
}
export function Button({ ...rest }: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <Feather
        name="plus"
        size={18}
        color="#737380"
      />
      <Text style={styles.text}>
        Novo Chat
      </Text>
    </TouchableOpacity>
  );
}