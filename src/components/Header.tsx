import { View } from 'react-native';
import { Icon } from './Icon';

import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

export function Header() {
  return (
    <View className='flex-row  mb-5'>
      <View className='flex-1'>
        <Icon>
          <Feather
            name='grid'
            size={20}
            color={colors.zinc[300]}
          />
        </Icon>
      </View>
      <Icon>
        <Feather
          name='trash-2'
          size={20}
          color={colors.zinc[300]}
        />
      </Icon>
      <Icon
        className='ml-6 '
      >
        <Feather
          name='user'
          size={20}
          color={colors.zinc[300]}
        />
      </Icon>
    </View>
  );
}