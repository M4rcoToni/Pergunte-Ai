import React, { useCallback, useEffect, useState } from 'react';

import { View, Modal as ReactNativeModal, ModalProps, Text } from 'react-native';
import { styles } from './styles';
import { Button } from './Button';
import { ChatsArea } from './ChatsArea';
import { Footer } from './Footer';
import { ChatProps } from './ChatsArea/index';

import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { chatGetAll } from '../../storage/chat/chatGetAll';
import { messageCreate } from '../../storage/message/messageCreate';
import { messageGetAll } from '../../storage/message/messageGetAll';

type Props = ModalProps & {
  onClose?: () => void;
}

export function Modal({ onClose, ...rest }: Props) {
  const navigation = useNavigation();



  return (
    <ReactNativeModal
      {...rest}
      transparent
    >
      <MotiView
        style={styles.container}
        from={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
      >
        <View style={styles.content}>
          <View style={styles.header}>

            <Feather
              name="x"
              size={30}
              color="#737380"
              onPress={onClose}
            />
          </View>



          <ChatsArea />

          <Footer />

        </View>
      </MotiView>

    </ReactNativeModal>
  );
}