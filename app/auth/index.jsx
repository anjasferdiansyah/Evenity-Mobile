import { Image, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import hero from '@/assets/login-ilustration.png';
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setRegisterAs } from "@/redux/slices/authSlice";
import { ROUTES } from "@/constant/ROUTES";
import { ROLE } from "@/constant/USER";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AuthScreen() {
    const dispatch = useDispatch();
    const { isLoggedIn, isInitialized } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isInitialized && isLoggedIn) {
            router.replace(ROUTES.DASHBOARD.INDEX);
        }
    }, [isInitialized, isLoggedIn]);

    function handleRegister(role) {
        return () => {
            dispatch(setRegisterAs(role));
            router.push(ROUTES.AUTH.REGISTER);
        }
    }

    // Animation values
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    // Start animation
    useEffect(() => {
        scale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
        opacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.exp) });
    }, [scale, opacity]);

    // Animated styles
    const animatedImageStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            opacity: opacity.value,
        };
    });

    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View className="flex-1 bg-[#F0FFF4]">
            <View className="flex-1 items-center justify-center px-6">
                <Animated.Image
                    style={[{ 
                        width: width * 0.8, 
                        height: width * 0.8, 
                        marginBottom: 20 
                    }, animatedImageStyle]}
                    source={hero}
                    resizeMode='contain'
                />
                
                <View className="w-full space-y-4">
                    <Animated.View style={animatedButtonStyle}>
                        <TouchableOpacity
                            onPress={() => router.replace(ROUTES.AUTH.LOGIN)}
                            className="bg-[#10B981] mx-auto w-full items-center justify-center py-4 rounded-full shadow-lg"
                        >
                            <Text className="text-white text-2xl font-outfitBold tracking-wider">
                                Login
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                    
                    <View className="flex-row items-center justify-center my-4">
                        <View className="flex-1 h-[1px] bg-gray-300 mr-3"></View>
                        <Text className="text-gray-500 text-xs">
                            Don't have an account?
                        </Text>
                        <View className="flex-1 h-[1px] bg-gray-300 ml-3"></View>
                    </View>

                    <Animated.View style={animatedButtonStyle}>
                        <TouchableOpacity
                            className="bg-[#34D399] mx-auto w-full items-center justify-center py-4 rounded-full shadow-lg"
                            onPress={handleRegister(ROLE.CUSTOMER)}
                        >
                            <Text className="text-white text-lg  font-outfitBold tracking-wider">
                                Register
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View style={animatedButtonStyle}>
                        <TouchableOpacity
                            className="bg-[#34D399] mx-auto w-full items-center justify-center py-4 rounded-full mt-2"
                            onPress={handleRegister(ROLE.VENDOR)}
                        >
                            <Text className="text-[#fff] text-lg tracking-wider font-outfitBold">
                                Register as Vendor
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        </View>
    );
}