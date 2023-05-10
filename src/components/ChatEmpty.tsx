import { View } from 'react-native';

import { MotiText } from 'moti';

type Props = {
  title: string;
  message: string;
}

export function ChatEmpty({ message, title }: Props) {
  return (
    <View className='flex-1 rounded-t-3xl bg-gray-back justify-center items-center'>
      <MotiText
        className='text-3xl self-center text-white font-extrabold tracking-wider mb-20'
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
      >
        {title}{'\n'}
        <MotiText className='font-regular text-2xl'>
          {message}
        </MotiText>
      </MotiText>
    </View>
  );
}