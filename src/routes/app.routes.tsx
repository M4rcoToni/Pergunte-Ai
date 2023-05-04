import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from '../screens/Home';
import { Chat } from '../screens/Chat';

const { Navigator, Screen } = createNativeStackNavigator();
export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>

      <Screen
        name='Home'
        component={Home}
      />
      <Screen
        name='Chat'
        component={Chat}
      />

    </Navigator>
  );
}