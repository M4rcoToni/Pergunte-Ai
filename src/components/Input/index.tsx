import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme/index';

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.container}
      placeholderTextColor={THEME.COLORS.GRAY_300}
      {...rest}
    >

    </TextInput>
  );
}