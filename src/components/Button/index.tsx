import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';

export function Button() {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
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