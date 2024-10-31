import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../screens/ProfileScreen';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ListRequestScreen from '../../screens/ListRequestScreen';
import HomeScreen from '../../screens/HomeScreen';
import RequestNavigation from './RequestNavigation';
import HistoryNavigation from './HistoryNavigation';

const Tab = createBottomTabNavigator()


const TabsNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
      tabBarIcon: ({focused, color}) => {
        let iconName;
        switch (route.name) {
          case 'Profile':
            iconName = focused ? 'account-outline' : 'account-outline'
            break;
          case 'Request':
            iconName = focused ? 'cart-outline' : 'cart-outline'
            break;
            case "Home":
            iconName = focused ? 'home-outline' : 'home-outline'
            break;
            case "History":
            iconName = focused ? 'history' : 'history'
            break;
        }
        return <MaterialComunityIcons name={iconName} size={35} color={color} />
      },
      tabBarShowLabel: false,
      headerShown: false,
      tabBarIconStyle: styles.tabBarIconStyle,
      tabBarStyle: styles.tabBarStyle,
      tabBarItemStyle: styles.tabBarItemStyle,
      tabBarActiveBackgroundColor: '#00AA55',
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: 'black',
      tabBarLabel : '',
    })}>
        <Tab.Screen  name='Home' component={HomeScreen} />
         <Tab.Screen name='Request' component={RequestNavigation} />
         
        <Tab.Screen name='History' component={HistoryNavigation} />
        
        <Tab.Screen name='Profile' component={ProfileScreen} />
        
    </Tab.Navigator>
  )
}

export default TabsNavigation

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 25,
    left: 50,
    right: 50,
    elevation: 5,
    backgroundColor: '#E9E9E9',
    borderRadius: 50,
    height: 80,
    padding: 5
  },
  tabBarItemStyle: {
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarIconStyle: {
    borderRadius: 50,
    fontSize: 40,
    alignItems: 'center',
    justifyContent: 'center',
  } 
})