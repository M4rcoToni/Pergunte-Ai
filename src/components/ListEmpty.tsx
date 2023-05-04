import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';

export function ListEmpty() {
  const [random, setRandom] = useState(0.5);

  useEffect(() => {
    setRandom(Math.random() * 0.7);
  }, []);

  return (
    <MotiView className='h-80'
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
      transition={{
        type: 'timing',
        duration: 500,
      }}
    >
      <LinearGradient
        colors={['#008eb1', '#b000c3']}
        start={[0, random]}
        end={[1, 0]}
        className='rounded-2xl flex-1 justify-center items-center '
      >
        <Text className=' text-3xl self-center text-white font-extrabold tracking-wider'>
          Pergunta ao Pepe!
        </Text>
        <Text className=' text-xl self-center text-white pt-8 font-regular tracking-wide'>
          Crie o seu Primeiro Chat 🚀
        </Text>
      </LinearGradient>
    </MotiView>
  );
}