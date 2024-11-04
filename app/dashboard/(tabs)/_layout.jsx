import {router, Tabs} from 'expo-router';
import React, {useEffect} from 'react';
import {Entypo, FontAwesome6, Fontisto, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {ROLE} from "@/constant/USER";
import { StyleSheet } from 'react-native';

export default function DashboardLayout() {
    const {isLoggedIn, user} = useSelector(state => state.auth);
    const role = user?.role

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace("/auth")
        }
    }, [isLoggedIn, router]);

    return (
        <Tabs screenOptions={{headerShown: false
            ,
            tabBarStyle: styles.tabBarStyle,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarActiveBackgroundColor: "#00AA55",
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "black",
            tabBarShowLabel: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <Ionicons size={28} name={"home"} color={color}/>
                }}
            />
            <Tabs.Screen
                name="product"
                options={{
                    href: role === ROLE.CUSTOMER ? null : "/dashboard/product",
                    title: 'Product',
                    tabBarIcon: ({color}) => <Fontisto name="shopping-bag-1" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="request"
                options={{
                    title: 'Request',
                    href: role === ROLE.CUSTOMER ? null : "/dashboard/request",
                    tabBarIcon: ({color}) => <FontAwesome6 name="book" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: 'Transaction',
                    tabBarIcon: ({color}) => <MaterialIcons name="account-balance-wallet" size={24} color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color}) => <Ionicons size={28} name={"person"} color={color}/>
                }}
            />
        </Tabs>
    )
        ;
}

const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 12,
        left: 20,
        right: 20,
        elevation: 3,
        borderRadius: 50,
        padding: 0,
    },
    tabBarItemStyle: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
})
