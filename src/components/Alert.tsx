
import { useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import colors from 'tailwindcss/colors';

type Props = {
  visible?: boolean;
  title: string;
  message: string;
  confirmText: string;
  onConfirmPressed: () => void;
}

export function Alert({ message, confirmText, onConfirmPressed, visible, title }: Props) {
  return (
    <AwesomeAlert
      show={visible}
      title={title}
      message={message}
      closeOnTouchOutside={false}
      showConfirmButton={true}
      confirmText={confirmText}
      titleStyle={{ color: '#fff', fontWeight: 'bold' }}
      messageStyle={{ color: '#fff' }}
      confirmButtonColor={colors.purple[800]}
      confirmButtonStyle={{ width: 50, height: 40, justifyContent: 'center', alignItems: 'center' }}
      contentContainerStyle={{ backgroundColor: '#262130', borderRadius: 16 }}
      onConfirmPressed={onConfirmPressed}
    />
  );
}

