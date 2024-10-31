// User Imports
import HomeScreen from "./screensUser/HomeScreenUsr";
import MakeEventName from "./screensUser/MakeEvent-nameEvent";
import MakeEventLocation from "./screensUser/MakeEvent-locationEvent";
import MakeEventDate from "./screensUser/MakeEvent-dateEvent";
import MakeEventTheme from "./screensUser/MakeEvent-themeEvent";
import ChooseVendor from "./screensUser/MakeEvent-chooseVendor";
import MakeEventCapacity from "./screensUser/MakeEvent-capacityEvent";
import MakeEventTransactionNote from "./screensUser/MakeEvent-transactionNote";

import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import "./global.css"
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './screens/HomeScreen';
import * as ExpoSplash from 'expo-splash-screen'
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AuthScreen from './screens/AuthScreen';
import RegisterScreen from './screens/RegisterScreen';
import CompletingRegister from './screens/CompletingRegister';
import {Provider} from "react-redux";
import store from "./redux/store";
import NewProduct from './screens/NewProduct';

const Stack = createNativeStackNavigator();
ExpoSplash.preventAutoHideAsync();

export default function App() {

    const [fontsLoaded, error] = useFonts({
        'Outfit-Black': require('./assets/fonts/Outfit/static/Outfit-Black.ttf'),
        'Outfit-ExtraBold': require('./assets/fonts/Outfit/static/Outfit-ExtraBold.ttf'),
        'Outfit-Bold': require('./assets/fonts/Outfit/static/Outfit-Bold.ttf'),
        'Outfit-SemiBold': require('./assets/fonts/Outfit/static/Outfit-SemiBold.ttf'),
        'Outfit-Regular': require('./assets/fonts/Outfit/static/Outfit-Regular.ttf'),
        'Outfit-Light': require('./assets/fonts/Outfit/static/Outfit-Light.ttf')
    })

    useEffect(() => {
        if (error) throw error
        if (fontsLoaded) ExpoSplash.hideAsync()
    }, [fontsLoaded, error])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Dashboard" component={TabsNavigation}/>
                    <Stack.Screen name="Splash" component={SplashScreen}/>
                    <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name='Auth' component={AuthScreen}/>
                    <Stack.Screen name='Register' component={RegisterScreen}/>
                    <Stack.Screen name="CompletingRegister" component={CompletingRegister}/>
                    <Stack.Screen name="NewProduct" component={NewProduct}/>
        <Stack.Screen name="MakeEventName" component={MakeEventName} />
        <Stack.Screen name="MakeEventLocation" component={MakeEventLocation} />
        <Stack.Screen name="MakeEventDate" component={MakeEventDate} />
        <Stack.Screen name="MakeEventTheme" component={MakeEventTheme} />
        <Stack.Screen name="MakeEventCapacity" component={MakeEventCapacity} />
        <Stack.Screen name="ChooseVendor" component={ChooseVendor} />
        <Stack.Screen name="MakeEventTransactionNote" component={MakeEventTransactionNote} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
