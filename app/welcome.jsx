import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import hero from "@/assets/hero.png";
import {router} from "expo-router";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {loadUser} from "@/redux/slices/authSlice";
import {useDispatch} from "react-redux";

const WelcomeScreen = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getToken = async () => {
            const token = await asyncStorage.getItem("token")
            if (token) {
                dispatch(loadUser())
                router.replace("/dashboard")
            }
        }
        getToken()
    }, []);

    return (
        <View className="flex-1 items-center justify-center bg-white h-full">
            <Image className="w-72 h-72 object-cover" source={hero} resizeMode="contain"/>
            <Text className="text-3xl font-outfitBold mb-10 w-[250px] text-center">
                Make Your Event Easy With us
            </Text>
            <TouchableOpacity className="bg-[#00AA55] px-8 py-2 rounded-full" onPress={() => router.replace("/auth")}>
                <Text
                    className="text-white text-xl font-outfitBold"
                >
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;
