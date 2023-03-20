import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../theme/index';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Feather name="menu" size={30} color={THEME.COLORS.GRAY_300} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Chat</Text>
      </View>
    </View>
  );
}