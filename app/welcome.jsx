import {Image, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import hero from "@/assets/hero.png";
import {useRouter} from "expo-router";
import {useSelector} from "react-redux";
import {ROUTES} from "@/constant/ROUTES";

export default function WelcomeScreen() {
    const router = useRouter();
    const {isLoggedIn} = useSelector(state => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.DASHBOARD.INDEX);
        }
    }, [isLoggedIn, router]);

    // If user is logged in, don't render anything
    if (isLoggedIn) {
        return null;
    }

    const handleNext = () => {
        router.replace("/auth");
    };

    return (
        <View className="flex-1 items-center justify-center bg-white h-full">
            <Image className="w-72 h-72 object-cover" source={hero} resizeMode="contain"/>
            <Text className="text-3xl font-outfitBold mb-10 w-[250px] text-center">
                Make Your Event Easy With us
            </Text>
            <TouchableOpacity
                className="bg-[#00AA55] px-8 py-2 rounded-full"
                onPress={handleNext}
            >
                <Text className="text-white text-xl font-outfitBold">
                    Next
                </Text>
            </TouchableOpacity>
        </View>
    );
}