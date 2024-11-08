import {router, Tabs} from "expo-router";
import React, {useEffect} from "react";
import {
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {ROLE} from "@/constant/USER";
import {StyleSheet} from "react-native";
import {ROUTES} from "@/constant/ROUTES";

export default function DashboardLayout() {
    const {isLoggedIn, isInitialized, user} = useSelector(
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
                tabBarItemStyle: styles.tabBarItemStyle,
                tabBarActiveBackgroundColor: "#00AA55",
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "black",
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({color}) => <Ionicons size={40} name={"home"} color={color}/>
                }}
            />
            <Tabs.Screen
                name="product"
                options={{
                    href: role === ROLE.CUSTOMER ? null : ROUTES.DASHBOARD.PRODUCT.INDEX,
                    title: "Product",
                    tabBarIcon: ({color}) => <FontAwesome5 name="store" size={38} color={color}/>

                }}
            />
            <Tabs.Screen
                name="request"
                options={{
                    title: "Request",
                    href: role === ROLE.CUSTOMER ? null : ROUTES.DASHBOARD.REQUEST.INDEX,
                    tabBarIcon: ({color}) => <FontAwesome6 name="book" size={40} color={color}/>

                }}
            />
            <Tabs.Screen
                name="event"
                options={{
                    title: "Events",
                    href: role === ROLE.CUSTOMER ? ROUTES.DASHBOARD.EVENT.INDEX : null,
                    tabBarIcon: ({color}) => (<FontAwesome name="calendar" size={38} color={color}/>),
                }}
            />
            <Tabs.Screen
                name="transaction"
                options={{
                    title: "Transaction",
                    tabBarIcon: ({color}) => {
                        if (role === ROLE.CUSTOMER) return <MaterialIcons name="work-history" size={42} color={color}/>
                        return <FontAwesome6 name="money-bill-transfer" size={40} color={color}/>
                    },
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({color}) => (<MaterialCommunityIcons name="account-cog" size={45} color={color}/>),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBarItemStyle: {
        alignItems: "center",
        borderRadius: 50,
        justifyContent: "center",
    },
    tabBarStyle: {
        backgroundColor: "#E9E9E9",
        borderRadius: 50,
        bottom: 30,
        elevation: 3,
        height: 70,
        left: 30,
        position: "absolute",
        right: 30,
    },
});
