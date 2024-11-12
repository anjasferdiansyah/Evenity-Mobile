import React from "react";
import {Dimensions, Image, ScrollView, Text, View} from "react-native";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Carousel from 'react-native-reanimated-carousel';
import {LinearGradient} from 'expo-linear-gradient';

import {
    ButtonListRequests,
    ButtonListTransactions,
    ButtonMakeEvent,
    ButtonSettingProfile
} from "@/components/dashboard/home/DashboardButton";
import {ROLE as ROLES} from "@/constant/USER";
import {SafeAreaView} from "react-native-safe-area-context";
import {ROUTES} from "@/constant/ROUTES";

// Event image placeholders (you can replace with your own or fetch from an API)
const EVENT_IMAGES = [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
    "https://images.unsplash.com/photo-1470345961863-06d4b12d93b3?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522776302589-df9907421c44?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export default function HomeScreen() {
    function handleButtonPressOne(role) {
        return () => {
            if (role === ROLES.CUSTOMER) {
                router.push(ROUTES.DASHBOARD.EVENT.NEW.INDEX)
            } else {
                router.push(ROUTES.DASHBOARD.PRODUCT.INDEX)
            }
        }
    }

    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const role = user?.role

    // useEffect(() => {
    //     dispatch(fetchUserProfile())
    // }, [dispatch])

    const {width} = Dimensions.get('window');

    if (!role) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-outfitBold">
                    You are not logged in
                </Text>
            </View>
        )
    }

    return (

        <LinearGradient
            colors={['#F0FFF4', '#E6FFF4', '#D4FAF0']}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50, flexGrow: 1}} // Add flexGrow
                >
                    {/* Header Section */}
                    <View className="px-6 pt-4 flex-row justify-between items-center">
                        <View>
                            {user?.detail && (
                                <Text className="text-4xl font-outfitBold">
                                    Hi, <Text className="text-[#10B981]">
                                        {user?.detail.fullName || user?.detail.name}
                                    </Text>
                                </Text>
                            )}
                            <Text className="text-gray-500 font-outfitRegular">
                                {new Date().toLocaleDateString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </Text>
                        </View>
                    </View>

                    {/* Event Carousel */}
                    <View className="mt-6">
                        <Carousel
                            loop
                            width={width}
                            height={width / 2}
                            autoPlay={true}
                            data={EVENT_IMAGES}
                            scrollAnimationDuration={1000}
                            renderItem={({item}) => (
                                <View className="px-6">
                                    <Image
                                        source={{uri: item}}
                                        className="w-full h-full rounded-2xl"
                                        style={{resizeMode: 'cover'}}
                                    />
                                </View>
                            )}
                        />
                    </View>

                    {/* Dashboard Buttons */}
                    <View className="px-6 mt-8">
                        <View className="flex-row space-x-4 gap-2">
                            <ButtonMakeEvent
                                onPress={handleButtonPressOne(role)}
                                role={role}
                                className="flex-1 justify-center"
                            />
                            <ButtonListRequests
                                onPress={() => router.push(ROUTES.DASHBOARD.REQUEST.INDEX)}
                                role={role}
                                className="flex-1 w-[30%]"
                            />
                        </View>
                        <View className="flex-row space-x-4 gap-1 mt-2">
                            <ButtonListTransactions
                                onPress={() => router.push(ROUTES.DASHBOARD.TRANSACTION.INDEX)}
                                className="flex-1"
                            />
                            <ButtonSettingProfile
                                onPress={() => router.push(ROUTES.DASHBOARD.PROFILE.INDEX)}
                                className="flex-1"
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        </LinearGradient>
        // <BottomPadding/>
    );
};