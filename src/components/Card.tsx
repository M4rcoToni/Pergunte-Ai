import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AnimatePresence, MotiView, } from 'moti';
import Animated, { Layout } from 'react-native-reanimated';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import colors from 'tailwindcss/colors';

import { messageChangeTitle } from '../storage/message/messageChangeTitle';
import { messageRemoveChat } from '../storage/message/messageRemoveChat';

type Props = {
  chatid: string;
  title: string;
  createdAt: string;
  isActive: boolean;
  changeCard: () => void;
}

export function Card({ changeCard, isActive, createdAt, title, chatid }: Props) {
  const navigation = useNavigation();
  const [newTitle, setNewTitle] = useState('');
  const [editable, setEditable] = useState(false);
  const [visible, setVisible] = useState(true);
  const changeTitleInputRef = useRef<TextInput>(null);


  async function handleChangeTitle(chatid: string, title: string) {
    try {
      if (title.length) {
        await messageChangeTitle(chatid, title);
        setTimeout(() => {
          changeCard()
        }, 800);
      }
      setEditable(false)
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveChat(chatid: string) {
    try {
      setVisible(false)
      await messageRemoveChat(chatid);

      setTimeout(() => {
        changeCard()
      }, 600);
    } catch (error) {
      console.log('ErrorRemove', error);
    }
  }
  useEffect(() => {
    if (changeTitleInputRef.current) {

      changeTitleInputRef.current?.focus();
      console.log('Ativo', editable);
    }
  }, [editable]);

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
              exitTransition={{ type: 'timing', duration: 350 }}
              transition={{
                type: 'timing',
                duration: 350,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('Chat', { chatid, title })}
                activeOpacity={0.8}
              >
                {
                  isActive ?
                    <MotiView
                      from={{ opacity: 0, }}
                      animate={{ opacity: 1, }}
                      transition={{ type: 'timing', duration: 450 }}
                    >
                      <LinearGradient
                        colors={['#009fc6', '#b000c3']}
                        start={[0, 0]}
                        end={[1, 1]}
                        className='rounded-t-2xl pb-1 h-28 '
                      >
                        <View className='px-5 pt-5'>
                          <Text className='text-white font-regular text-xs'>
                            {createdAt}
                          </Text>
                        </View>

                        {
                          editable ?
                            <View className='px-5 py-3 w-fit '>
                              <TextInput
                                placeholder='Digite um titulo'
                                placeholderTextColor='#fff'
                                onChangeText={setNewTitle}
                                ref={changeTitleInputRef}
                                onFocus={() => changeTitleInputRef.current?.focus()}
                                autoCorrect={false}
                                returnKeyType='done'
                                onEndEditing={() => handleChangeTitle(chatid, newTitle)}
                                className='text-white text-base font-regular'
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
                    </MotiView>
                    :
                    <View className='h-28'>
                      <View className='px-5 pt-5'>
                        <Text className='text-white font-regular text-xs'>
                          {createdAt}
                        </Text>
                      </View>
                      {
                        editable ?
                          <View className='px-5 py-3 w-fit'>
                            <TextInput
                              placeholder='Digite um titulo'
                              placeholderTextColor='#fff'
                              onChangeText={setNewTitle}
                              ref={changeTitleInputRef}
                              onFocus={() => changeTitleInputRef.current?.focus()}
                              autoCorrect={false}
                              returnKeyType='done'
                              onEndEditing={() => handleChangeTitle(chatid, newTitle)}
                              className='text-white text-base font-regular'
                            />
                          </View>
                          :
                          <View className='px-5 py-3 w-fit'>
                            <Text className='text-white text-base font-regular '>
                              {editable ? '' : title}
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
                  onPress={() => setEditable(true)}
                  activeOpacity={0.6}
                >
                  <Feather
                    name='edit-3'
                    size={24}
                    color={editable ? colors.purple[400] : colors.zinc[600]}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRemoveChat(chatid)}
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