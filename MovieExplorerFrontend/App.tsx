import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import { colors } from './theme';
import ProfileScreen from './screens/ProfileScreen';
export type RootStackParamList = {
  Home: undefined;
  Detail: { movie: any };
  Favorites: undefined;
   Login: undefined;
  Register: undefined;
  Profile: undefined;
};


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen
  name="Detail"
  component={DetailScreen}
  options={{
    title: '',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerShadowVisible: false,
  }}
/>
        <Stack.Screen
  name="Favorites"
  component={FavoritesScreen}
  options={{
    title: '',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerShadowVisible: false,
  }}
/>

<Stack.Screen
  name="Register"
  component={RegisterScreen}
  options={{
    title: '',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerShadowVisible: false,
  }}
/>

<Stack.Screen
  name="Login"
  component={LoginScreen}
  options={{
    title: '',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerShadowVisible: false,
  }}
/>

<Stack.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: '',
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.text,
    headerShadowVisible: false,
  }}
/>
      </Stack.Navigator>

  
    </NavigationContainer>
  );
}