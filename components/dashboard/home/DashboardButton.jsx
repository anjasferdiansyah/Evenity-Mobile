import {Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {ROLE as ROLES} from "@/constant/USER";

function ButtonMakeEvent({role, onPress}) {
    return <TouchableOpacity onPress={onPress}
                             className={role === ROLES.CUSTOMER ? "w-full p-5 h-[190px] bg-[#00F279] rounded-xl flex flex-col justify-between" : "w-1/2 p-5 h-[190px] bg-[#78F3B5] rounded-xl flex flex-col justify-between"}>
        <View className="p-4 bg-white rounded-full max-w-[60px]">
            <MaterialCommunityIcons name="cart" size={30}/>
        </View>

        <View>
            <Text className="text-white font-outfitBold text-2xl text-wrap">
                {role === ROLES.CUSTOMER ? "Make" : "See"}
            </Text>
            <Text className="text-white font-outfitBold text-4xl text-wrap">
                {role === ROLES.CUSTOMER ? "Event" : "Product"}
            </Text>
        </View>
    </TouchableOpacity>;
}

function ButtonListRequests({onPress, role}) {
    return <TouchableOpacity onPress={onPress}
                             className={role === ROLES.CUSTOMER ? "hidden" : "w-1/2 p-5 h-[190px] bg-[#00F279] rounded-xl flex flex-col justify-between"}>
        <View className="p-4 bg-white rounded-full max-w-[60px]">
            <MaterialCommunityIcons name="cart" size={30}/>
        </View>

        <View>
            <Text className="text-white font-outfitBold text-2xl text-wrap">
                List
            </Text>
            <Text className="text-white font-outfitBold text-4xl text-wrap">
                Requests
            </Text>
        </View>
    </TouchableOpacity>;
}

function ButtonListTransactions(props) {
    return <TouchableOpacity
        onPress={props.onPress}
        className="w-1/2 p-5 h-[190px]  bg-[#00F279] rounded-xl flex flex-col justify-between">
        <View className="p-4 bg-white rounded-full max-w-[60px]">
            <MaterialCommunityIcons name="cart" size={30}/>
        </View>

        <View>
            <Text className="text-white font-outfitBold text-2xl text-wrap">
                List
            </Text>
            <Text className="text-white font-outfitBold text-4xl text-wrap">
                Orders
            </Text>
        </View>
    </TouchableOpacity>;
}

function ButtonSettingProfile(props) {
    return <TouchableOpacity
        onPress={props.onPress}
        className="w-1/2 p-5 h-[190px] bg-[#78F3B5]  rounded-xl flex flex-col justify-between">
        <View className="p-4 bg-white rounded-full max-w-[60px]">
            <MaterialCommunityIcons name="cart" size={30}/>
        </View>

        <View>
            <Text className="text-white font-outfitBold text-2xl text-wrap">
                Settings
            </Text>
            <Text className="text-white font-outfitBold text-4xl text-wrap">
                Profile
            </Text>
        </View>
    </TouchableOpacity>;
}

export {ButtonMakeEvent, ButtonListRequests, ButtonListTransactions, ButtonSettingProfile}