import {router, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {Entypo, Ionicons} from "@expo/vector-icons";
import {useSelector} from "react-redux";

export default function DashboardLayout() {
    const {isLoggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/auth")
        }
    }, [isLoggedIn, router]);

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
