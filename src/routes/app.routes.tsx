import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Chat } from '../screens/Chat';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createNativeStackNavigator();
export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}>

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