import {Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '@/redux/slices/authSlice'
import axios from 'axios'
import {router} from 'expo-router'
import {ROUTES} from "@/constant/ROUTES";

export default function ChangePassword() {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')




    const { userInfo } = useSelector((state) => state.profile)

    const dispatch = useDispatch()
    
    const handleChangePassword = async () => {

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password not matched")
        } else {

            try {
                const login = await axios.post("auth/login", {email: userInfo?.email, password: oldPassword})
                if(login.status === 401) {
                    alert("Old password is not matched")
                    } else {
                        const response = await axios.put(`auth/user/${userInfo?.detail.userId}/password`, {email: userInfo?.email, password : newPassword })
                        console.log("response", response)
                        if (response.status === 200) {
                            alert("Password changed successfully")
                            router.push("/dashboard/profile")
                    }
                }
            } catch (error) {
                console.log(error)
            }


        }
    }


    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full p-10">
                <Text className="text-2xl font-outfitBold w-full">
                    Change Password
                </Text>
                <View className="flex flex-col gap-4 py-safe-or-12">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Old Password</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter name.."
                            secureTextEntry
                            value={oldPassword}
                            onChangeText={(text) => setOldPassword(text)}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">New Password</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter your new password.."
                            secureTextEntry
                            value={newPassword}
                            onChangeText={(text) => setNewPassword(text)}
                        />
                    </View>
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Confirm New Password</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter your new password.."
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={(text) => setConfirmPassword(text)}
                        />
                    </View>
                    <TouchableOpacity

                        className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full"
                        onPress={handleChangePassword}
                    >
                        <Text className="text-white text-xl font-outfitBold">Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}