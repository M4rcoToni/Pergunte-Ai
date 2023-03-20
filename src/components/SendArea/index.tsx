import React, { useState } from 'react';
import { View, TextInputProps, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme/index';
import { Feather } from '@expo/vector-icons';
import { Input } from '../Input';
import { Loading } from '../Loading/index';

type Props = TextInputProps & {
  onClear?: () => void;
}

export function SendArea({ value, editable, onClear, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={styles.container}>
      <Input
        style={[styles.input, { borderColor: isFocused ? THEME.COLORS.PRIMARY : THEME.COLORS.GRAY_400 }]}
        placeholderTextColor={THEME.COLORS.GRAY_300}
        value={value}
        onFocus={() => setIsFocused(true)}
        editable={editable}
        {...rest}
      />

      {
        value && value?.length > 0 &&
        <TouchableOpacity
          style={styles.send}
          onPress={onClear}
        >
          {
            editable ?
              <Feather
                name="send"
                size={24}
                color={THEME.COLORS.PRIMARY}
              />
              :
              <Loading />
          }

        </TouchableOpacity>
      }
    </View>
  );
}