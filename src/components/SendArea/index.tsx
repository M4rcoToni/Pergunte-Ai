import React, { useState } from 'react';
import { View, TextInputProps, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme/index';
import { Feather } from '@expo/vector-icons';
import { Input } from '../Input';
import { Loading } from '../Loading/index';
import { MotiView, } from 'moti';
import { BounceIn } from 'react-native-reanimated';

type Props = TextInputProps & {
  onClear?: () => void;
}

export function SendArea({ value, editable, onClear, ...rest }: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>

      <MotiView

        animate={{
          width: value && value?.length > 0 ? '90%' : '100%',
        }}
        transition={{
          type: 'timing',
          duration: 350,
        }}
      >
        <Input
          style={[styles.input, { borderColor: isFocused ? THEME.COLORS.PRIMARY : THEME.COLORS.GRAY_400 }]}
          placeholderTextColor={THEME.COLORS.GRAY_300}
          value={value}
          onFocus={() => setIsFocused(true)}
          editable={editable}
          {...rest}
        />
      </MotiView>

      {
        value && value?.length > 0 &&
        <TouchableOpacity
          style={styles.send}
          onPress={onClear}
        >
          <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={250}
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

          </MotiView>
        </TouchableOpacity>
      }

    </View>
  );
}