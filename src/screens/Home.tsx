import { View, FlatList } from 'react-native';
import { Card } from '../components/Card';
import { Feather } from '@expo/vector-icons';
export function Home() {
  return (
    <View className='flex-1 bg-gray-back pt-10 px-6'>
      <View className='pb-6'>
        <View className='h-12 w-12 rounded-full bg-gray-500'>

        </View>
      </View>

      <View>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => String(item)}
          renderItem={(item) =>
            <Card
              id={item.index.toString()}
              title='Home'
              date='02/05/2023'
              isActive={false}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className='h-16 w-16 bg-purple-700 justify-center items-center rounded-full absolute bottom-0 right-0 mb-8 mr-5'>
        <Feather
          name='plus'
          size={24}
          color='white'
        />
      </View>
    </View>
  )
}