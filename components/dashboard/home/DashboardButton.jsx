import {Text, TouchableOpacity, View} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import React from "react";
import {ROLE as ROLES} from "@/constant/USER";
import { FontAwesome6, Fontisto, Ionicons, MaterialIcons } from "@expo/vector-icons";

function ButtonMakeEvent({role, onPress}) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            className={`
                ${role === ROLES.CUSTOMER 
                    ? "w-[325px] bg-[#00F279]" 
                    : "w-1/2 bg-[#4ADE80]"}
                p-4 h-[170px] rounded-3xl flex flex-col justify-between 
                shadow-md
            `}
        >
            <View className="p-3 bg-white/20 rounded-xl self-start max-w-[55px]">
                { role === ROLES.CUSTOMER && <MaterialCommunityIcons name="cart" size={26} color="white"/>}
                { role === ROLES.VENDOR && <Fontisto name="shopping-bag-1" size={26} color="white" />}
            </View>

            <View>
                <Text className="text-white font-outfitMedium text-lg opacity-80">
                    {role === ROLES.CUSTOMER ? "Make" : "See"}
                </Text>
                <Text className="text-white font-outfitBold text-3xl">
                    {role === ROLES.CUSTOMER ? "Event" : "Product"}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function ButtonListRequests({onPress, role}) {
    return (
        <TouchableOpacity 
            onPress={onPress}
            className={`
                ${role === ROLES.CUSTOMER 
                    ? "hidden" 
                    : "w-1/2 bg-[#00F279]"}
                p-4 h-[170px] rounded-3xl flex flex-col justify-between 
                shadow-md
            `}
        >
            <View className="p-3 bg-white/20 rounded-xl self-start max-w-[55px]">
                <FontAwesome6 name="list" size={26} color="white" />
            </View>

            <View>
                <Text className="text-white font-outfitMedium text-lg opacity-80">
                    List
                </Text>
                <Text className="text-white font-outfitBold text-3xl">
                    Requests
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function ButtonListTransactions(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            className="
                w-1/2 p-4 h-[170px] 
                bg-[#00F279] 
                rounded-3xl flex flex-col justify-between 
                shadow-md
            "
        >
            <View className="p-3 bg-white/20 rounded-xl self-start max-w-[55px]">
                <MaterialIcons name="account-balance-wallet" size={26} color="white" />
            </View>

            <View>
                <Text className="text-white font-outfitMedium text-lg opacity-80">
                    Orders
                </Text>
                <Text className="text-white font-outfitBold text-3xl">
                    History
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function ButtonSettingProfile(props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            className="
                w-1/2 p-4 h-[170px] 
                bg-[#4ADE80] 
                rounded-3xl flex flex-col justify-between 
                shadow-md
            "
        >
            <View className="p-3 bg-white/20 rounded-xl self-start max-w-[55px]">
                <Ionicons size={26} name="person" color="white" />
            </View>

            <View>
                <Text className="text-white font-outfitMedium text-lg opacity-80">
                    Settings
                </Text>
                <Text className="text-white font-outfitBold text-3xl">
                    Profile
                </Text>
            </View>
        </TouchableOpacity>
    );
}

export {ButtonMakeEvent, ButtonListRequests, ButtonListTransactions, ButtonSettingProfile}