import { Image, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import hero from "@/assets/login-ilustration.png";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "@/constant/ROUTES";
import { initializeAuth } from "@/redux/slices/authSlice";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function WelcomeScreen() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoggedIn, isInitialized } = useSelector(state => state.auth);

    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeAuth());
        }
    }, [dispatch, isInitialized]);

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.DASHBOARD.INDEX);
        }
    }, [isLoggedIn, router]);

    // If user is logged in, don't render anything
    if (isLoggedIn) {
        return null;
    }

    const handleNext = () => {
        router.replace(ROUTES.AUTH.INDEX);
    };

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

    const animatedTextStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View className="flex-1 items-center justify-center bg-white h-full">
            <Animated.Image
                style={[{ width: '80%', height: undefined, aspectRatio: 1, marginBottom: 20 }, animatedImageStyle]}
                source={hero}
                resizeMode="contain"
            />
            <Animated.Text className="text-3xl font-outfitBold mb-10 w-[250px] text-center" style={[{  color: '#333', fontFamily: 'Outfit-Bold' }, animatedTextStyle]}>
                Make Your Event Easy With Us
            </Animated.Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    Next
                </Text>
            </TouchableOpacity>
            <Animated.View style={animatedTextStyle}>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#00AA55',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,
        elevation: 5, // Add shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});