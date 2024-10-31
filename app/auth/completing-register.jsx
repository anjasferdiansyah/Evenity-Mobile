import {View, Text, TextInput} from 'react-native'
import React, {useState} from 'react'
import {TouchableOpacity} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {completingRegister} from "@/redux/slices/authSlice";

const CompletingRegister = () => {
    const [vendorName, setVendorName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const {registerData} = useSelector(state => state.auth)
    const dispatch = useDispatch();

    const handleRegister = () => {
        const newRegisterData = {
            ...registerData,
            name: vendorName,
            phoneNumber,
            address,
            ownerName
        }
        // console.log(newRegisterData)
        dispatch(completingRegister(newRegisterData))
    }

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full mt-20 p-10">
                <Text className="text-5xl font-outfitBold w-full">Completing Register</Text>
                <View className="flex flex-col gap-4 py-safe-or-12">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Vendor Name</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder='Enter vendor name..'
                            onChangeText={setVendorName}
                            value={vendorName}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Phone Number</Text>
                        <TextInput
                            onChangeText={setPhoneNumber}
                            value={phoneNumber}
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder='Enter phoneNumber number'/>
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Address Detail</Text>
                        <TextInput
                            onChangeText={setAddress}
                            value={address}
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder='Enter product name'/>
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Owner Name</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder='Enter the name of the owner'
                            onChangeText={setOwnerName}
                            value={ownerName}
                        />
                    </View>
                    <TouchableOpacity onPress={() => handleRegister()}
                                      className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full">
                        <Text className="text-white text-xl font-bold">Register</Text>
                    </TouchableOpacity>
                    <Text className="text-center text-gray-500 text-sm mt-4">
                        Have an account?{" "}
                        <Text
                            className="text-blue-500"
                            onPress={() => router.push("auth/login")}
                        >
                            Login
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default CompletingRegister