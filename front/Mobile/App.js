import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login/Login";
import Home from "./src/Home/Home";
import Area from "./src/Area/AreaPage";
import Connection from "./src/Connection/Connection";
import CreateAreaPage from "./src/Area/CreateArea/CreateAreaPage";
import Register from "./src/Register/RegisterPage";
import ChooseAreaName from "./src/Area/CreateArea/ChooseAreaName/ChooseAreaName";
import ActionListPage from "./src/Area/CreateArea/ChoseAction/ActionListPage";
import ReactionListPage from "./src/Area/CreateArea/ChooseReaction/ReactionListPage";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const storeFetchUrl = async () => {
  try {
    const url = await AsyncStorage.getItem('fetchUrl');
    if (url === null) {
      await AsyncStorage.setItem('fetchUrl', 'http://inox-qcb.fr:8000');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const loadFonts = async () => {
  await Font.loadAsync({
    Nexa: require("./assets/fonts/Nexa-Heavy.ttf"),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        await storeFetchUrl();
      } catch (e) {
        console.warn(e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Connection"
          component={Connection}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="Area"
          component={Area}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="CreateArea"
          component={CreateAreaPage}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="ChooseAreaName"
          component={ChooseAreaName}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="ChooseAction"
          component={ActionListPage}
          options={{ headerShown: false, animationEnabled: false }}
        />
        <Stack.Screen
          name="ChooseReaction"
          component={ReactionListPage}
          options={{ headerShown: false, animationEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
