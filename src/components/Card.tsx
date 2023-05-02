import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import tw from 'twrnc';

import colors from 'tailwindcss/colors';

type Props = {
  id: string;
  title: string;
  date: string;
  isActive: boolean
}
export function Card({ isActive }: Props) {

  return (
    <View className='h-40 w-full rounded-2xl bg-gray-500 mb-4 shadow-md  shadow-black'>
      <View style={tw(isActive && 'bg-purple-600 rounded-t-2xl pb-1')}>
        <View className='px-5 pt-4'>
          <Text className='text-white font-regular text-sm'>
            02/05/2023
          </Text>
        </View>

        <View className='px-5 py-3 w-fit'>
          <Text className='text-white text-base font-regular'>
            Dependency Information Retrieval Depe ndency Inform ation Retrieval
          </Text>
        </View>

      </View>

      <View className='flex-1 flex-row px-5 items-center gap-6'>
        <TouchableOpacity className='flex-1'>
          <Feather
            name='more-horizontal'
            size={24}
            color={colors.zinc[600]}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather
            name='edit-3'
            size={24}
            color={colors.zinc[600]}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Feather
            name='trash-2'
            size={24}
            color={colors.zinc[600]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}