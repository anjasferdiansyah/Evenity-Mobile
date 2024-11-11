import React, { useEffect, useState } from 'react'
import { 
    Text, 
    TextInput, 
    TouchableOpacity, 
    View, 
    KeyboardAvoidingView, 
    Platform 
} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { completingRegisterVendor, resetError, resetStatus } from "@/redux/slices/authSlice";
import { router } from "expo-router";
import { ROUTES } from "@/constant/ROUTES";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { loadCategories } from '@/redux/slices/categorySlice';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const CompletingRegisterVendor = () => {
    const [vendorName, setVendorName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const { registerData, status, error } = useSelector(state => state.auth)
    const [categoryId, setCategoryId] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "registered") {
            dispatch(resetStatus())
            alert("Registered successfully, please login")
            router.push(ROUTES.AUTH.LOGIN)
        }
    }, [dispatch, status]);

    useEffect(() => {
        if (error) {
            dispatch(resetError())
            alert(error)
        }
    }, [dispatch, error])

    const handleRegister = () => {    
        const newRegisterData = {
            ...registerData,
            name: vendorName,
            phoneNumber,
            address,
            ownerName,
            mainCategory : "CATERING"
        }
        dispatch(completingRegisterVendor(newRegisterData))
    }


    const mapToLabelAndValue = (categories) => {
        return categories.map((category) => ({
            label: category.mainCategory,
            value: category.id,
        }));
    }


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
                        <Text className="text-4xl font-outfitBold text-gray-800 text-center">
                            Vendor Registration
                        </Text>
                        <Text className="text-gray-500 mt-2 text-center font-outfitLight">
                            Complete your vendor profile
                        </Text>
                    </Animated.View>

                    <Animated.View 
                        entering={FadeInDown}
                        className="bg-white/80 rounded-2xl shadow-md p-6"
                    >
                        <View className="flex flex-col gap-5">
                            {/* Vendor Name Input */}
                            <View className="flex flex-col gap-2">
                                <Text className="font-outfitRegular text-gray-600">Vendor Name</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-xl">
                                    <MaterialCommunityIcons 
                                        name="store" 
                                        size={24} 
                                        color="gray" 
                                        className="ml-3"
                                    />
                                    <TextInput
                                        className="flex-1 py-3 px-3 text-base font-outfitRegular"
                                        placeholder="Enter vendor name"
                                        onChangeText={setVendorName}
                                        value={vendorName}
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
                                        placeholder="Enter phone number"
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
                                        placeholder="Enter vendor address"
                                        multiline={true}
                                        numberOfLines={3}
                                        onChangeText={setAddress}
                                        value={address}
                                        textAlignVertical="top"
                                    />
                                </View>
                            </View>

                            {/* Owner Name Input */}
                            <View className="flex flex-col gap-2">
                                <Text className="font-outfitRegular text-gray-600">Owner Name</Text>
                                <View className="flex-row items-center border border-gray-200 rounded-xl">
                                    <MaterialCommunityIcons 
                                        name="account" 
                                        size={24} 
                                        color="gray" 
                                        className="ml-3"
                                    />
                                    <TextInput
                                        className="flex-1 py-3 px-3 text-base font-outfitRegular"
                                        placeholder="Enter owner's name"
                                        onChangeText={setOwnerName}
                                        value={ownerName}
                                    />
                                </View>
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                onPress={handleRegister}
                                className="bg-[#10B981] rounded-full py-4 mt-4 shadow-md flex-row justify-center items-center"
                            >
                                <MaterialCommunityIcons 
                                    name="check-circle" 
                                    size={24} 
                                    color="white" 
                                    className="mr-2"
                                />
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
    )
}

export default CompletingRegisterVendor