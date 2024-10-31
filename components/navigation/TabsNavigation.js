import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../../screens/ProfileScreen";
import MaterialComunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import OrderScreen from "../../screens/OrderScreen";
// import HomeScreen from '../../screens/HomeScreen';
import HomeScreenUser from "../../screensUser/HomeScreenUsr";
import MakeEventName from "../../screensUser/MakeEvent-nameEvent";
import MakeEventLocation from "../../screensUser/MakeEvent-locationEvent";
import MakeEventDate from "../../screensUser/MakeEvent-dateEvent";

const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          switch (route.name) {
            case "Profile":
              iconName = focused ? "account-outline" : "account-outline";
              break;
            case "Order":
              iconName = focused ? "ferris-wheel" : "ferris-wheel";
              break;
            case "Home":
              iconName = focused ? "home-outline" : "home-outline";
              break;
            case "History":
              iconName = focused ? "book-edit-outline" : "book-edit-outline";
              break;
          }
          return (
            <MaterialComunityIcons name={iconName} size={35} color={color} />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIconStyle: styles.tabBarIconStyle,
        tabBarStyle: styles.tabBarStyle,
        tabBarItemStyle: styles.tabBarItemStyle,
        tabBarActiveBackgroundColor: "#00AA55",
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarLabel: "",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenUser} />
      <Tab.Screen name="Order" component={MakeEventDate} />

      <Tab.Screen name="History" component={ProfileScreen} />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabsNavigation;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 25,
    left: 50,
    right: 50,
    elevation: 5,
    backgroundColor: "#E9E9E9",
    borderRadius: 50,
    height: 80,
    padding: 5,
  },
  tabBarItemStyle: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarIconStyle: {
    borderRadius: 50,
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
