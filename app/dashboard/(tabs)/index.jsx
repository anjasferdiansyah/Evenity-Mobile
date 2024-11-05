import {Text, View} from "react-native";
import React from "react";
import {router} from "expo-router";
import {useSelector} from "react-redux";
import {
    ButtonListRequests,
    ButtonListTransactions,
    ButtonMakeEvent,
    ButtonSettingProfile
} from "@/components/dashboard/home/DashboardButton";
import {ROLE as ROLES} from "@/constant/USER";


export default function HomeScreen() {
    function handleButtonPressOne(role) {
        return () => {
            if (role === ROLES.CUSTOMER) {
                router.push("/dashboard/make-event/")
            } else {
                router.push("/dashboard/product")
            }
        }
    }

    const {user} = useSelector(state => state.auth)
    const role = user?.role
    console.log(user)
    if (!role) {
        return <View className="flex-1 items-center justify-center bg-white">
            <Text className="text-2xl font-outfitBold">
                You are not logged in
            </Text>
        </View>
    }
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full px-10 justify-center">
                <View className="flex flex-row gap-4 justify-between px-5">
                    <View>
                        <Text className="text-6xl font-outfitBold">
                            Hi, <Text className="text-[#00AA55]">Joko!</Text>
                        </Text>
                        <Text className="text-gray-500 font-outfitRegular">
                           {new Date().toDateString()}
                        </Text>
                    </View>
                </View>

                <View className="flex flex-col gap-4 items-center justify-between self-center my-8 px-5">
                    <View className="flex flex-row gap-4 items-center justify-between w-full">
                        <ButtonMakeEvent onPress={handleButtonPressOne(role)} role={role}/>
                        <ButtonListRequests onPress={() => router.push("/dashboard/request")} role={role}/>
                    </View>
                    <View className="flex flex-row gap-4 items-center justify-between w-full">
                        <ButtonListTransactions onPress={() => router.push("/dashboard/transaction")}/>
                        <ButtonSettingProfile onPress={() => router.push("/dashboard/profile")}/>
                    </View>


                </View>
            </View>
        </View>
    );
};
