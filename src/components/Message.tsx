import { View, Text } from 'react-native';

import { MessageStorageDTO } from '../storage/chat/ChatStorageDTO';

type Props = MessageStorageDTO & {
  response: boolean;
}

export function Message({ createdAt, message, response }: Props) {
  return (
    <View>
      {
        response ?
          <View className='flex-wrap-reverse pr-6'>
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
          <View className='flex-wrap pr-6'>
            <View className='bg-gray-500  m-3 p-4 rounded-t-2xl rounded-r-2xl '>
              <Text className='text-white font-regular text-base'>
                {message}
              </Text >
            </View>
            <Text className='text-zinc-500 font-regular text-xs  pl-4'>
              {createdAt}
            </Text>
          </View>
      }
    </View>
  );
}