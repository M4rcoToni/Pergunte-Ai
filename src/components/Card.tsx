import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AnimatePresence, MotiView, } from 'moti';
import Animated, { Layout } from 'react-native-reanimated';

import { Feather } from '@expo/vector-icons';

import colors from 'tailwindcss/colors';

import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  chatid: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  visible: boolean;
  editable?: boolean;
  removeChat: () => void;
  changeTitle: () => void;
}

export function Card({ visible = true, changeTitle, editable, isActive, createdAt, title, chatid, removeChat }: Props) {
  const navigation = useNavigation();

  return (
    <Animated.View
      layout={Layout}
    >
      <AnimatePresence>
        {
          visible && (
            <MotiView
              className='h-40 w-full rounded-2xl bg-gray-500 my-2 shadow-sm shadow-black '
              from={{
                opacity: 0,
                translateY: -50
              }}
              animate={{
                opacity: 1,
                translateY: 0
              }}
              exit={{
                opacity: 0,
                translateY: -50
              }}
              exitTransition={{ type: 'timing', duration: 400 }}
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

                      {
                        editable ?
                          <View className='px-5 py-3 w-fit'>
                            <TextInput
                              placeholder='Digite um nome'
                              placeholderTextColor='#fff'
                              className='text-white text-base font-regular '
                            />
                          </View>

                          :
                          <View className='px-5 py-3 w-fit'>
                            <Text className='text-white text-base font-regular '>
                              {title}
                            </Text>
                          </View>
                      }

                    </LinearGradient>
                    :
                    <View className='h-28'>
                      <View className='px-5 pt-4'>
                        <Text className='text-white font-regular text-sm'>
                          {createdAt}
                        </Text>
                      </View>
                      {
                        editable ?
                          <View className='px-5 py-3 w-fit'>
                            <TextInput
                              placeholder='Digite um nome'
                              className='text-white text-base font-regular '
                            />
                          </View>

                          :

                          <View className='px-5 py-3 w-fit'>
                            <Text className='text-white text-base font-regular '>
                              {title}
                            </Text>
                          </View>
                      }
                    </View>
                }
              </TouchableOpacity>

              <View className='flex-row px-5 py-2 items-center gap-6'>
                <View className='flex-1'>
                  <TouchableOpacity >
                    <Feather
                      name='more-horizontal'
                      size={32}
                      color={colors.zinc[600]}
                    />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={changeTitle}
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
          )
        }
      </AnimatePresence>
    </Animated.View>
  );
}