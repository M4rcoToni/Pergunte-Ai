import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../theme/index';
import { Modal } from '../Modal/Index';
type Props = {
  onPress: () => void;
}

export function Header({ onPress }: Props) {
  return (
    <View style={styles.container}>

      <View >
        <Text style={styles.title}>ChatGPT</Text>
      </View>

      <View >
        <TouchableOpacity
          onPress={onPress}
        >
          <Feather name="menu" size={30} color={THEME.COLORS.GRAY_300} />
        </TouchableOpacity>
      </View>

    </View >
  );
}