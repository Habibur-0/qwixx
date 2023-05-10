// Imports the necessary components and styles needed for a React Native screen.
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//imports the Welcome, HowToPlay and End screen
import WelcomeScreen from './src/Screens/Welcome';
import HowToPlayScreen from './src/Screens/HowToPlay';
import EndScreen from './src/Screens/End';

//Imports all 5 player screen 
import Player1 from './src/Screens/Player1';
import Player2 from './src/Screens/Player2';
import Player3 from './src/Screens/Player3';
import Player4 from './src/Screens/Player4';
import Player5 from './src/Screens/Player5';

//sets up two differnt navigations 
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* removes the default header that goes accorss the screen */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* loads all the tab navigators onto a stack navigator */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="HowToPlay" component={HowToPlayScreen} />
      <Stack.Screen name="TwoPlayers" component={TwoPlayers} />
      <Stack.Screen name="ThreePlayers" component={ThreePlayers} />
      <Stack.Screen name="FourPlayers" component={FourPlayers} />
      <Stack.Screen name="FivePlayers" component={FivePlayers} />
      <Stack.Screen name="End" component={EndScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// creates a funcation made up of two players using a tab navigator
function TwoPlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player1" component={Player1} />
      <Tab.Screen name="Player2" component={Player2} />
    </Tab.Navigator>
  );
}

// creates a funcation made up of three players using a tab navigator
function ThreePlayers() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Player1" component={Player1} />
      <Tab.Screen name="Player2" component={Player2} />
      <Tab.Screen name="Player3" component={Player3} />
    </Tab.Navigator>
  );
}

// creates a funcation made up of four players using a tab navigator
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

// creates a funcation made up of five players using a tab navigator
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