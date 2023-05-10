// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from './src/Screens/Welcome';
import HowToPlayScreen from './src/Screens/HowToPlay';
import EndScreen from './src/Screens/End';

import Player1 from './src/Screens/Player1';
import Player2 from './src/Screens/Player2';
import Player3 from './src/Screens/Player3';
import Player4 from './src/Screens/Player4';
import Player5 from './src/Screens/Player5';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />

      <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />


      <Stack.Screen name="TwoPlayers" component={TwoPlayers} />

      <Stack.Screen name="FivePlayers" component={FivePlayers} />


      <Stack.Screen name="End" component={EndScreen} />

        <Stack.Screen name="ThreePlayers" component={ThreePlayers} />
        <Stack.Screen name="FourPlayers" component={FourPlayers} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function TwoPlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player1" component={Player1} />
      <Tab.Screen name="Player2" component={Player2} />
    </Tab.Navigator>
  );
}

function ThreePlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player2" component={Player2} />
      <Tab.Screen name="Player1" component={Player1} />

      <Tab.Screen name="Player3" component={Player3} />
    </Tab.Navigator>
  );
}

function FourPlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player1" component={Player1} />
      <Tab.Screen name="Player2" component={Player2} />
      <Tab.Screen name="Player3" component={Player3} />
      <Tab.Screen name="Player4" component={Player4} />
    </Tab.Navigator>
  );
}

function FivePlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player1" component={Player1} />
      <Tab.Screen name="Player2" component={Player2} />
      <Tab.Screen name="Player3" component={Player3} />
      <Tab.Screen name="Player4" component={Player4} />
      <Tab.Screen name="Player5" component={Player5} />
    </Tab.Navigator>
  );
}

export default App;