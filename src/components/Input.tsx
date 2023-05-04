import { TextInput, View } from 'react-native';
import { Icon } from './Icon';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';


export function Input() {
  return (
    <View className='flex-row items-center' >
      <MotiView
        className='pr-3'
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
          className='bg-gray-500 rounded-full h-14 w-72 px-8 font-regular text-base text-white border border-gray-500 focus:border-cyan-300 '
        />
      </MotiView>

      <Icon
        className='bg-purple-500 h-14 w-14 shadow-lg shadow-purple-700 rotate-[225deg] '
      >
        <Feather
          name="heart"
          size={24}
          color="white"
        />
      </Icon>
    </View>
  );
}