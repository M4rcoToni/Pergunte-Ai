import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import colors from 'tailwindcss/colors';

import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AnimatePresence, MotiView, } from 'moti';
import { useAnimatedStyle, Layout } from 'react-native-reanimated';

type Props = {
  chatid: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  visible?: boolean;
  removeChat: () => void;
}

export function Card({ visible = true, isActive, createdAt, title, chatid, removeChat }: Props) {
  const navigation = useNavigation();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: visible ? 1 : 0,
      transform: [
        {
          translateY: visible ? 0 : -50,
        },
      ],
    };
  });
  return (
    <AnimatePresence>
      {
        !visible && (
          <MotiView
            style={animatedStyle}
            className='h-40 w-full rounded-2xl bg-gray-500 mb-4 shadow-md  shadow-black'
            from={{
              opacity: 0,
              translateY: -50
            }}
            layout={Layout}
            animate={{
              opacity: 1,
              translateY: 0
            }}
            exit={{
              opacity: 0,
              translateY: -50
            }}
            transition={{
              type: 'timing',
              duration: 350,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', { chatid })}
              activeOpacity={0.8}
            >
              {
                isActive ?
                  <LinearGradient
                    colors={['#009fc6', '#b000c3']}
                    start={[0, 0]}
                    end={[1, 1]}
                    className='rounded-t-2xl pb-1 h-28 '
                  >

                    <View className='px-5 pt-4'>
                      <Text className='text-white font-regular text-sm'>
                        {createdAt}
                      </Text>
                    </View>
                    <View className='px-5 py-3 w-fit'>
                      <Text className='text-white text-base font-regular '>
                        {title}
                      </Text>
                    </View>
                  </LinearGradient>
                  :
                  <View className='h-28'>
                    <View className='px-5 pt-4'>
                      <Text className='text-white font-regular text-sm'>
                        {createdAt}
                      </Text>
                    </View>
                    <View className='px-5 py-3 w-fit'>
                      <Text className='text-white text-base font-regular '>
                        {title}
                      </Text>
                    </View>
                  </View>
              }
            </TouchableOpacity>

            <View className='flex-1 flex-row px-5 items-center gap-6'>
              <TouchableOpacity className='flex-1'>
                <Feather
                  name='more-horizontal'
                  size={32}
                  color={colors.zinc[600]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.6}
              >
                <Feather
                  name='edit-3'
                  size={24}
                  color={colors.zinc[600]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={removeChat}
                activeOpacity={0.6}
              >
                <Feather
                  name='trash-2'
                  size={24}
                  color={colors.zinc[600]}
                />
              </TouchableOpacity>
            </View>
          </MotiView>
        )}
    </AnimatePresence>
  );
}