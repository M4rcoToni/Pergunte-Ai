import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';

export function ListEmpty() {
  return (
    <View className='flex-1  h-80'>
      <LinearGradient
        colors={['#097692', '#b000c3']}
        start={[1, 0]}
        end={[0, 1]}
        className='rounded-2xl flex-1  justify-center items-center'
      >
        <Text className=' text-3xl self-center text-white font-extrabold tracking-wider'>
          Pergunta ao Pepe !
        </Text>
        <Text className=' text-2xl self-center text-white pt-8 font-regular tracking-wide'>
          Crie seu Primeiro Chat
        </Text>
      </LinearGradient>
    </View>
  );
}