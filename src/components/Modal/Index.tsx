import React from 'react';
import { View, Modal as ReactNativeModal, ModalProps, Text } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { Button } from '../Button';
type Props = ModalProps & {
  onClose?: () => void;
}
export function Modal({ onClose, ...rest }: Props) {
  return (
    <ReactNativeModal
      {...rest}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>

            <Feather
              name="x"
              size={30}
              color="#737380"
              onPress={onClose}
            />
          </View>

          <View >
            <Button />
          </View>

        </View>
      </View>

    </ReactNativeModal>
  );
}