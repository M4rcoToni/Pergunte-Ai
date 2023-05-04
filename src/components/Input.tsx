import { TextInput, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';

import { Feather } from '@expo/vector-icons';

export function Input() {
  return (
    <MotiView
      className='pr-3 flex-row items-center'
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
        placeholder='Digite sua mensagem'
        placeholderTextColor='#fff'
        className='bg-gray-500 rounded-full h-14 w-80 px-8 font-regular text-base text-white border border-gray-500 focus:border-cyan-300 '
      />

      <TouchableOpacity
        className='bg-purple-500 h-14 w-14 ml-2 shadow-lg shadow-purple-700 rotate-[225deg] items-center justify-center rounded-full'
        activeOpacity={0.8}
      >
        <Feather
          name="heart"
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </MotiView>
  );
}