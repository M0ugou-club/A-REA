import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/Login/Login';
import Home from './src/Home/Home';
import Area from './src/Area/AreaPage';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    'Nexa': require('./assets/fonts/Nexa-Heavy.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Area" 
          component={Area} 
          options={{ headerShown: false, animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
