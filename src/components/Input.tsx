import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';

import { Feather } from '@expo/vector-icons';

type Props = TextInputProps & {
  editable: boolean;
  onPress: () => void;
}

export function Input({ editable = false, onPress, ...rest }: Props) {
  return (
    <MotiView
      className='flex-row items-center px-2'
      from={{
        translateY: 100,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        type: 'timing',
        duration: 400,
      }}
    >

      <TextInput
        placeholder='Digite sua pergunta'
        placeholderTextColor='#fff'
        autoCorrect={false}
        returnKeyType='done'
        className='bg-gray-500 rounded-full h-14 w-72 px-8 font-regular text-base text-white border border-gray-500 focus:border-cyan-300 '
        {...rest}
      />
      <MotiView
        className='flex-1'
        from={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        exit={{
          opacity: 0,
        }}
        transition={{ type: 'timing', duration: 500 }}
        exitTransition={{ type: 'timing', duration: 500 }}
      >
        <TouchableOpacity
          className='bg-purple-500 h-14 w-14 ml-4 shadow-lg shadow-purple-700 rotate-[225deg] items-center justify-center rounded-full'
          activeOpacity={0.8}
          onPress={onPress}
        >
          <Feather
            name="heart"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </MotiView>

    </MotiView>
  );
}