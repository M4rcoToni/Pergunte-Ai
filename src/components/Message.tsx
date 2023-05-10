import { View, Text, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard';

import { MessageStorageDTO } from '../storage/chat/ChatStorageDTO';

import { MaterialIcons } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

type Props = MessageStorageDTO & {
  response: boolean;
}

export function Message({ createdAt, message, response }: Props) {

  async function handleCopyToClipboard() {
    await Clipboard.setStringAsync(message)
  }

  return (
    <View>
      {
        response ?
          <View className='flex-wrap-reverse pr-16'>
            <View className='bg-gray-600  m-3 p-4  rounded-t-2xl rounded-l-2xl items-end ' >
              <Text className='text-white font-regular text-base'>
                {message}
              </Text>
            </View>
            <Text className='text-zinc-500 font-regular text-xs self-start pr-4'>
              {createdAt}
            </Text>
          </ View>
          :
          <View className='flex-row pr-16 items-center '>
            <View className='flex-wrap '>
              <View className='bg-gray-500  m-3 p-4 rounded-t-2xl rounded-r-2xl '>
                <Text className='text-white font-regular text-base'>
                  {message}
                </Text >
              </View>
              <Text className='text-zinc-500 font-regular text-xs  pl-4'>
                {createdAt}
              </Text>
            </View>
            <TouchableOpacity
              className='h-12 w-12 justify-center rounded-lg  pb-4'
              onPress={handleCopyToClipboard}
              activeOpacity={0.8}
            >
              <MaterialIcons
                name='content-copy'
                size={22}
                color={colors.zinc[500]}
              />
            </TouchableOpacity>
          </View>
      }
    </View>
  );
}