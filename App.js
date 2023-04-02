// In App.js in a new project
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './src/screens/Welcome';
import MainScreen from './src/screens/Main';

// import CameraScreen from './src/screens/Camera';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;