import React from 'react';
import { View, Modal as ReactNativeModal, ModalProps, Text } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { Button } from './Button';
import { ChatsArea } from './ChatsArea';
import { Footer } from './Footer';
import { MotiView } from 'moti';
type Props = ModalProps & {
  onClose?: () => void;
}
export function Modal({ onClose, ...rest }: Props) {
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

          <Button />

          <ChatsArea />

          <Footer />

        </View>
      </MotiView>

    </ReactNativeModal>
  );
}