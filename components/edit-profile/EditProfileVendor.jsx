import {Text, TextInput, TouchableOpacity, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {router} from "expo-router";
import { clearProfile, editVendorProfile, fetchUserProfile } from "@/redux/slices/profileSlice";

const provinceData = [
    {label: "JAWA BARAT", value: "32", name: "JAWA BARAT"},
    {label: "JAWA TENGAH", value: "33", name: "JAWA TENGAH"},
    {label: "JAWA TIMUR", value: "35", name: "JAWA TIMUR"},
    {label: "DKI JAKARTA", value: "31", name: "DKI JAKARTA"},
    {label: "D.I YOGYAKARTA", value: "34", name: "D.I YOGYAKARTA"},
];

export default function EditProfileVendor() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const { userInfo } = useSelector((state) => state.profile)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserProfile())
    }, [dispatch]);

    useEffect(() => {
        if (userInfo)
        {
            setName(userInfo?.detail.name|| "")
            setPhoneNumber(userInfo?.detail.phoneNumber|| "")
            setAddress(userInfo?.detail.address || "")
            setOwnerName(userInfo?.detail.owner || "")
        }
        
    }, [userInfo, dispatch]);


    const handleEditProfile = async () => {
        const newRegisterData = {
            name,
            phoneNumber,
            province : userInfo?.detail.province,
            city : userInfo?.detail.city,
            district : userInfo?.detail.district,
            mainCategory : "CATERING",
            address,
            ownerName
        }

        try {
            dispatch(editVendorProfile({  updatedVendorProfile: newRegisterData, id : userInfo?.detail.id }))
            dispatch(clearProfile())
            router.back()
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full p-10">
                <Text className="text-2xl font-outfitBold w-full">
              Edit Profile
                </Text>
                <View className="flex flex-col gap-4 py-safe-or-12">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Name</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter name.."
                            onChangeText={(text) => setName(text)}
                            value={name}

                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">
                      Phone Number
                        </Text>
                        <TextInput
      
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter phone number"
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">
                      Address
                        </Text>
                        <TextInput
                     
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter address detail"
                            onChangeText={(text) => setAddress(text)}
                            value={address}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">
                      Owner Name
                        </Text>
                        <TextInput
                     
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter address detail"
                            onChangeText={(text) => setOwnerName(text)}
                            value={ownerName}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleEditProfile}
                        className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full"

                    >
                        <Text className="text-white text-xl font-outfitBold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}