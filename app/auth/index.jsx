import {Image, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect} from 'react'
import hero from '@/assets/hero.png'
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {setRegisterAs} from "@/redux/slices/authSlice";
import {ROUTES} from "@/constant/ROUTES";
import {ROLE} from "@/constant/USER";

export default function AuthScreen() {
    // setupAxios()
    const dispatch = useDispatch()
    const {isLoggedIn, isInitialized} = useSelector((state) => state.auth);

    useEffect(() => {
        if (isInitialized && isLoggedIn) {
            router.replace(ROUTES.DASHBOARD.INDEX)
        }
    }, [isInitialized, isLoggedIn]);

    function handleRegister(role) {
        return () => {
            dispatch(setRegisterAs(role))
            router.push(ROUTES.AUTH.REGISTER)
        }
    }

    return (
        <View className="pt-10 flex-1 items-center justify-center bg-white">
            <View className="px-10 mt-4">
                <Image className="w-[450px] h-[450px] object-cover mx-auto" source={hero} resizeMode='contain'/>
                <View className="flex flex-col gap-2">
                    <TouchableOpacity onPress={() => router.replace('auth/login')}
                                      className="bg-[#00AA55] mx-auto w-[60%] items-center justify-center px-8 py-3 rounded-full">
                        <Text className="text-white text-xl font-outfitBold">
                            Login!
                        </Text>
                    </TouchableOpacity>
                    <View className="flex flex-row gap-2 items-center justify-center overflow-hidden">
                        <View className="h-[1px] w-1/4 bg-gray-300"></View>
                        <View>
                            <Text className="text-center text-gray-500 text-xs">Don't have an account?</Text>
                        </View>
                        <View className="h-[1px] w-1/4 bg-gray-300"></View>
                    </View>

                    <TouchableOpacity
                        className="bg-[#00F279] mx-auto w-[60%] items-center justify-center px-8 py-3 rounded-full"
                        onPress={handleRegister(ROLE.CUSTOMER)}>
                        <Text className="text-white text-xl font-outfitBold">
                            Register
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="bg-[#00F279] mx-auto w-[60%] items-center justify-center px-8 py-3 rounded-full"
                        onPress={handleRegister(ROLE.VENDOR)}>
                        <Text className="text-white text-xl font-outfitBold">
                            Register as Vendor
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}
