import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { completingRegisterUser, resetError, resetStatus } from "@/redux/slices/authSlice";
import { router } from "expo-router";
import { ROUTES } from "@/constant/ROUTES";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CompletingRegisterUser = () => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const { registerData, status, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "registered") {
            dispatch(resetStatus());
            alert("Registered successfully, please login");
            router.push(ROUTES.AUTH.LOGIN);
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (error) {
            dispatch(resetError());
            alert(error);
        }
    }, [dispatch, error]);

    const handleRegister = () => {
        const newRegisterData = {
            ...registerData,
            fullName: userName,
            phoneNumber,
            address,
        };
        dispatch(completingRegisterUser(newRegisterData));
    };

    return (
        <LinearGradient 
            colors={['#F0FFF4', '#E6FFF4', '#D4FAF0']} 
            className="flex-1"
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center"
            >
                <View className="px-6">
                    <Animated.View 
                        entering={FadeInUp} 
                        className="mb-8 items-center"
                    >
                        <Text className="text-4xl font-outfitBold text-gray-800">
                            Complete Your Profile
                        </Text>
                        <Text className="text-gray-500 mt-2 text-center font-outfitLight">
                            Just a few more steps to get started
                        </Text>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown}
                        className="bg-white/80 rounded-2xl shadow-md p-6"
                    >
                        <View className="flex flex-col gap-5">
                            {/* Name Input */}
                            <View className="flex flex-col gap-2">
                                <Text className="font-outfitRegular text-gray-600">Name</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-xl">
                                    <MaterialCommunityIcons 
                                        name="account" 
                                        size={24} 
                                        color="gray" 
                                        className="ml-3"
                                    />
                                    <TextInput
                                        className="flex-1 py-3 px-3 text-base font-outfitRegular"
                                        placeholder="Enter your full name"
                                        onChangeText={setUserName}
                                        value={userName}
                                    />
                                </View>
                            </View>

                            {/* Phone Number Input */}
                            <View className="flex flex-col gap-2">
                                <Text className="font-outfitRegular text-gray-600">Phone Number</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-xl">
                                    <MaterialCommunityIcons 
                                        name="phone" 
                                        size={24} 
                                        color="gray" 
                                        className="ml-3"
                                    />
                                    <TextInput
                                        className="flex-1 py-3 px-3 text-base font-outfitRegular"
                                        placeholder="Enter your phone number"
                                        keyboardType="phone-pad"
                                        onChangeText={setPhoneNumber}
                                        value={phoneNumber}
                                    />
                                </View>
                            </View>

                            {/* Address Input */}
                            <View className="flex flex-col gap-2">
                                <Text className="font-outfitRegular text-gray-600">Address Detail</Text>
                                <View className="flex-row items-start border border-gray-200 rounded-xl">
                                    <MaterialCommunityIcons 
                                        name="map-marker" 
                                        size={24} 
                                        color="gray" 
                                        className="ml-3 mt-3"
                                    />
                                    <TextInput
                                        className="flex-1 py-3 px-3 text-base font-outfitRegular"
                                        placeholder="Enter your address"
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={setAddress}
                                        value={address}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                onPress={handleRegister}
                                className="bg-[#10B981] rounded-full py-4 mt-4 shadow-md"
                            >
                                <Text className="text-white text-center text-lg font-outfitBold">
                                    Complete Registration
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Login Redirect */}
                    <View className="mt-4 flex-row justify-center">
                        <Text className="text-gray-500 font-outfitRegular">
                            Already have an account?{" "}
                            <Text 
                                className="text-[#10B981] font-outfitBold"
                                onPress={() => router.push(ROUTES.AUTH.LOGIN)}
                            >
                                Login
                            </Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

export default CompletingRegisterUser;