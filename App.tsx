import { StatusBar } from 'expo-status-bar';
import { useFonts, NotoSans_400Regular, NotoSans_700Bold, NotoSans_800ExtraBold } from "@expo-google-fonts/noto-sans";
import { Loading } from './src/components/Loading';
import { Chat } from './src/screens/Chat';

import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  const [fontsLoaded] = useFonts({
    NotoSans_400Regular,
    NotoSans_700Bold,
    NotoSans_800ExtraBold
  });

  if (!fontsLoaded) {
    return (
      <Loading />
    )
  }

  return (
    <SafeAreaProvider >
      <StatusBar
        style="auto"
        backgroundColor="transparent"
        translucent
      />
      <Chat />
    </SafeAreaProvider>
  );
}
