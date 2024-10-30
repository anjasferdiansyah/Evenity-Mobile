import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/ProfileScreen';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import CompletingRegister from './screens/CompletingRegister';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
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