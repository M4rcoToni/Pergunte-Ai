import React from 'react';
import { View, Modal as ReactNativeModal, ModalProps, Text } from 'react-native';

import { styles } from './styles';
import { Feather } from '@expo/vector-icons';
import { Button } from './Button';
import { ChatsArea } from './ChatsArea';
import { Footer } from './Footer';
import { MotiView } from 'moti';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { ChatProps } from './ChatsArea/index';


type Props = ModalProps & {
  item?: ChatProps[];
  onClose?: () => void;
}

export function Modal({ item, onClose, ...rest }: Props) {
  const navigation = useNavigation();
  const id = uuid.v4();

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

          <Button
            onPress={() => navigation.navigate('Chat', { chatid: id.toString() })}
          />

          <ChatsArea items={item} />

          <Footer />

        </View>
      </MotiView>

    </ReactNativeModal>
  );
}