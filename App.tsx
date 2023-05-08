import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter';

import { Loading } from './src/components/Loading';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Routes } from './src/routes/index';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaProvider className='bg-gray-back' >
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </SafeAreaProvider>
  );
}
