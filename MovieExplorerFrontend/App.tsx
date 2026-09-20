import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import FavoritesScreen from './screens/FavoritesScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { movie: any };
  Favorites: undefined;
};


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Filmovi' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalji' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{title: 'Favoriti'}} />
      </Stack.Navigator>

  
    </NavigationContainer>
  );
}