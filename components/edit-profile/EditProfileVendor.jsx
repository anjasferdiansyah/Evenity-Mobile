import {Text, TextInput, TouchableOpacity, View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {router} from "expo-router";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { clearProfile, editVendorProfile, fetchUserProfile } from "@/redux/slices/profileSlice";
import { clearUser, loadUser } from "@/redux/slices/authSlice";

export default function EditProfileVendor() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const { user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        if(!user){
            dispatch(loadUser())
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user)
        {
            setName(user?.detail.name|| "")
            setPhoneNumber(user?.detail.phoneNumber|| "")
            setAddress(user?.detail.address || "")
            setOwnerName(user?.detail.owner || "")
        }
    }, [user, dispatch]);

    const handleEditProfile = async () => {
        const newRegisterData = {
            name,
            phoneNumber,
            province : user?.detail.province,
            city : user?.detail.city,
            district : user?.detail.district,
            mainCategory : "CATERING",
            address,
            ownerName
        }

        try {
            dispatch(editVendorProfile({  updatedVendorProfile: newRegisterData, id : user?.detail.id }))
            dispatch(clearUser())
            dispatch(loadUser())
            router.back()
        } catch (error) {
            console.log(error)
        }
    }

    const renderInput = (label, value, onChangeText, placeholder) => (
        <View className="mb-4">
            <Text className="text-sm font-outfitRegular text-[#6B7280] mb-2">{label}</Text>
            <TextInput
                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-4 py-3 text-[#1F2937] text-base font-outfitRegular"
                placeholder={placeholder}
                placeholderTextColor="#9CA3AF"
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <View className="flex-1 px-6 pt-6">
                    {/* Header */}
                    <View className="flex-row items-center mb-6 mt-10">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="mr-4 p-2 rounded-full bg-[#F3F4F6]"
                        >
                            <AntDesignIcons name='arrowleft' size={20} color={'#374151'}/>
                        </TouchableOpacity>
                        <Text className="text-2xl font-outfitSemiBold text-[#111827]">
                            Edit Profile
                        </Text>
                    </View>

                    {/* Content */}
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        className="flex-1"
                    >
                        <View 
                            className="bg-white rounded-2xl p-6 shadow-md"
                            style={{
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 2
                            }}
                        >
                            {renderInput(
                                "Name", 
                                name, 
                                (text) => setName(text), 
                                "Enter your name"
                            )}

                            {renderInput(
                                "Phone Number", 
                                phoneNumber, 
                                (text) => setPhoneNumber(text), 
                                "Enter your phone number"
                            )}

                            {renderInput(
                                "Address", 
                                address, 
                                (text) => setAddress(text), 
                                "Enter your address"
                            )}

                            {renderInput(
                                "Owner Name", 
                                ownerName, 
                                (text) => setOwnerName(text), 
                                "Enter owner name"
                            )}
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            onPress={handleEditProfile}
                            className="bg-[#10B981] mt-6 items-center justify-center py-4 rounded-xl"
                        >
                            <Text className="text-white text-base font-bold">Save Changes</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}