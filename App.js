import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './screens/HomeScreen';
import * as ExpoSplash from 'expo-splash-screen'
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import CompletingRegister from './screens/CompletingRegister';
import TabsNavigation from './components/navigation/TabsNavigation';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
ExpoSplash.preventAutoHideAsync()

export default function App() {

  const [fontsLoaded, error] = useFonts({
    'Outfit-Black' : require('./assets/fonts/Outfit/static/Outfit-Black.ttf'),
    'Outfit-ExtraBold' : require('./assets/fonts/Outfit/static/Outfit-ExtraBold.ttf'),
    'Outfit-Bold' : require('./assets/fonts/Outfit/static/Outfit-Bold.ttf'),
    'Outfit-SemiBold' : require('./assets/fonts/Outfit/static/Outfit-SemiBold.ttf'),
    'Outfit-Regular' : require('./assets/fonts/Outfit/static/Outfit-Regular.ttf'),
    'Outfit-Light' : require('./assets/fonts/Outfit/static/Outfit-Light.ttf')  })


    useEffect(() => {
      if(error) throw error
      if(fontsLoaded) ExpoSplash.hideAsync()
    }, [fontsLoaded, error])




  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={TabsNavigation} />
      <Stack.Screen name="Splash" component={SplashScreen}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen}/>
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name='Auth' component={AuthScreen}/>
      <Stack.Screen name='Register' component={RegisterScreen}/>
      <Stack.Screen name="CompletingRegister" component={CompletingRegister}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}