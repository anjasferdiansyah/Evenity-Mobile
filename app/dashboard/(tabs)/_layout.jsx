import React, { useEffect } from "react";
import { router, Tabs } from "expo-router";
import {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { ROLE } from "@/constant/USER";
import { ROUTES } from "@/constant/ROUTES";
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    withTiming 
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

function AnimatedTabIcon({ focused, color, icon }) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { 
                    scale: withSpring(focused ? 1.2 : 1, {
                        damping: 10,
                        stiffness: 300
                    }) 
                },
                { 
                    translateY: withTiming(focused ? -10 : 0, {
                        duration: 200
                    }) 
                }
            ],
            opacity: withSpring(focused ? 1 : 0.7, {
                damping: 10,
                stiffness: 300
            })
        };
    }, [focused]);

    return (
        <Animated.View style={animatedStyle}>
            {icon(color)}
        </Animated.View>
    );
}

export default function DashboardLayout() {
    const { isLoggedIn, isInitialized, user } = useSelector(
        (state) => state.auth
    );
    const role = user?.role;

    useEffect(() => {
        if (!isLoggedIn) {
            router.replace(ROUTES.AUTH.INDEX);
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (!isInitialized) {
            router.replace(ROUTES.WELCOME);
        }
    }, [isInitialized]);

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView 
                        intensity={50} 
                        style={StyleSheet.absoluteFill}
                    />
                ),
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarActiveTintColor: "#00AA55",
                tabBarInactiveTintColor: "#8E8E93",
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                <Ionicons 
                                    size={40} 
                                    name="home" 
                                    color={iconColor}
                                />
                            )} 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="product"
                options={{
                    href: role === ROLE.CUSTOMER ? null : ROUTES.DASHBOARD.PRODUCT.INDEX,
                    title: "Product",
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                <FontAwesome5 
                                    name="store" 
                                    size={38} 
                                    color={iconColor}
                                />
                            )} 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="request"
                options={{
                    title: "Request",
                    href: role === ROLE.CUSTOMER ? null : ROUTES.DASHBOARD.REQUEST.INDEX,
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                <FontAwesome6 
                                    name="book" 
                                    size={40} 
                                    color={iconColor}
                                />
                            )} 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="event"
                options={{
                    title: "Events",
                    href: role === ROLE.CUSTOMER ? ROUTES.DASHBOARD.EVENT.INDEX : null,
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                <FontAwesome 
                                    name="calendar" 
                                    size={38} 
                                    color={iconColor}
                                />
                            )} 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: "Transaction",
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                role === ROLE.CUSTOMER 
                                    ? <MaterialIcons 
                                        name="work-history" 
                                        size={42} 
                                        color={iconColor}
                                      />
                                    : <FontAwesome6 
                                        name="money-bill-transfer" 
                                        size={40} 
                                        color={iconColor}
                                      />
                            )} 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => (
                        <AnimatedTabIcon 
                            focused={focused} 
                            color={color} 
                            icon={(iconColor) => (
                                <MaterialCommunityIcons 
                                    name="account-cog" 
                                    size={45} 
                                    color={iconColor}
                                />
                            )} 
                        />
                    )
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarItemStyle: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    tabBarStyle: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderTopWidth: 0,
        borderTopColor: 'transparent',
        borderRadius: 30,
        bottom: 20,
        elevation: 5,
        height: 70,
        left: 20,
        right: 20,
        position: 'absolute',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: 4 
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
});