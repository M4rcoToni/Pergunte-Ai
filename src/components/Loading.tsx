import { View } from 'moti';
import { ActivityIndicator } from 'react-native';
import colors from 'tailwindcss/colors';

export function Loading() {
  return (
    <View className='flex-1 justify-center items-center'>
      <ActivityIndicator
        size='large'
        color={colors.purple[600]}
      />
    </View>
  );
}