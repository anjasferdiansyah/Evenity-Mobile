import { Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { router } from 'expo-router';
import { ROUTES } from "@/constant/ROUTES";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { userInfo } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const handleChangePassword = async () => {
        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match");
        } else {
            try {
                const loginResponse = await axios.post("auth/login", { email: userInfo?.email, password: oldPassword });
                if (loginResponse.status === 401) {
                    alert("Old password is incorrect");
                } else {
                    const response = await axios.put(`auth/user/${userInfo?.detail.userId}/password`, { email: userInfo?.email, password: newPassword });
                    if (response.status === 200) {
                        alert("Password changed successfully");
                        router.push("/dashboard/profile");
                    }
                }
            } catch (error) {
                console.log(error);
                alert("An error occurred. Please try again.");
            }
        }
    };

    const renderInput = (label, value, onChangeText, placeholder, secureTextEntry, showPassword, toggleShowPassword) => (
        <View className="mb-4">
            <Text className="text-sm font-outfitSemiBold text-[#6B7280] mb-2">{label}</Text>
            <View className="relative flex-row items-center">
                <TextInput
                    className="font-outfitRegular bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base flex-1"
                    placeholder={placeholder}
                    placeholderTextColor="#9CA3AF"
                    onChangeText={onChangeText}
                    value={value}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    onPress={toggleShowPassword}
                    className="absolute right-4"
                    style={{ top: '50%', transform: [{ translateY: -10 }] }} // Adjust this value based on your TextInput height
                >
                    <AntDesignIcons name={showPassword ? 'eye' : 'eyeo'} size={20} color="#6B7280" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-6 mt-10">
                    {/* Header */}
                    <View className="flex-row items-center mb-6">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="mr-4 p-2 rounded-full bg-[#F3F4F6]"
                        >
                            <AntDesignIcons name='arrowleft' size={20} color={'#374151'} />
                        </TouchableOpacity>
                        <Text className="text-2xl font-outfitBold text-[#111827]">Change Password</Text>
                    </View>

                    {/* Content */}
                    <View className="flex-1 bg-white rounded-2xl p-6 shadow-md ">
                        {renderInput(
                            "Old Password", 
                            oldPassword, 
                            setOldPassword, 
                            "Enter your old password", 
                            true, 
                            showOldPassword, 
                            () => setShowOldPassword(!showOldPassword)
                        )}
                        {renderInput(
                            "New Password", 
                            newPassword, 
                            setNewPassword, 
                            "Enter your new password", 
                            true, 
                            showNewPassword, 
                            () => setShowNewPassword(!showNewPassword)
                        )}
                        {renderInput(
                            "Confirm New Password", 
                            confirmPassword, 
                            setConfirmPassword, 
                            "Confirm your new password", 
                            true, 
                            showConfirmPassword, () => setShowConfirmPassword(!showConfirmPassword)
                        )}
                        <TouchableOpacity
                            className="bg-[#00AA55] mt-6 items-center justify-center py-3 rounded-xl"
                            onPress={handleChangePassword}
                        >
                            <Text className="text-white text-lg font-outfitBold">Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}