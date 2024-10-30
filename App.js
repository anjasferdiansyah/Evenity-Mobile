import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { useFonts, Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold} from '@expo-google-fonts/outfit';



const Stack = createNativeStackNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'outfit_regular': Outfit_400Regular,
    'outfit_medium': Outfit_500Medium,
    'outfit_semibold': Outfit_600SemiBold,
    'outfit_bold': Outfit_700Bold
  })

  if (!fontsLoaded) {
    return null
  }


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Splash" component={SplashScreen}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}