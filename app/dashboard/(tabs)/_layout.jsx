import {Tabs} from 'expo-router';
import React from 'react';
import {Entypo, Ionicons} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DashboardLayout() {

    // useEffect(() => {
    //     async function checkToken() {
    //         const token = await AsyncStorage.getItem('token');
    //         if (!token) {
    //             router.replace('auth/login')
    //         }
    //     }
    //     checkToken();
    // }, []);

    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => <Ionicons size={28} name={"home"}/>
                }}
            />
            <Tabs.Screen
                name="request"
                options={{
                    title: 'Request',
                    tabBarIcon: () => <Entypo name="shop" size={24} color="black"/>
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: 'Transaction',
                    tabBarIcon: () => <Ionicons size={28} name={"person"}/>
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: () => <Ionicons size={28} name={"person"}/>
                }}
            />
        </Tabs>
    );
}
