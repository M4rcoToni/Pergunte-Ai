import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { THEME } from '../../theme/index';
import { Modal } from '../Modal/Index';

export function Header() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => { setModalVisible(prev => !prev); };
  return (
    <View style={styles.container}>
      <Modal
        visible={modalVisible}
        onClose={handleOpenModal}
      />

      <View >
        <Text style={styles.title}>Chat</Text>
      </View>

      <View >
        <TouchableOpacity
          onPress={handleOpenModal}
        >
          <Feather name="menu" size={30} color={THEME.COLORS.GRAY_300} />
        </TouchableOpacity>
      </View>

    </View >
  );
}