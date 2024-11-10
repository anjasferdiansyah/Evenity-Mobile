import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import { ProgressBar } from "@/components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "twrnc";
import { useDispatch } from "react-redux";
import { ROUTES } from "@/constant/ROUTES";
import { resetRecommendedList, resetRegistMakeEvent } from "@/redux/slices/makeEventSlice";

const MakeEventLayout = ({
    progress,
    children,
    nextRoute,
    handleAccept,
    handleNext,
    handleRegenerateVendor,
    nextInfor,
    isInputValid,
}) => {
    const dispatch = useDispatch();

    const handleBack = () => {
        dispatch(resetRegistMakeEvent());
        dispatch(resetRecommendedList());
        router.back();
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Close Button */}
            <TouchableOpacity
                style={{
                    position: "absolute",
                    top: 40,
                    right: 20,
                    backgroundColor: "red",
                    borderRadius: 50,
                    padding: 10,
                    zIndex: 10,
                }}
                onPress={() => {
                    router.replace(ROUTES.DASHBOARD.INDEX);
                }}
            >
                <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>

            {/* Progress Bar */}
            <View className="w-10/12 px-6 pt-16">
                <ProgressBar progress={progress} variant="success" />
            </View>

            {/* Content Area */}
            <View className="flex-1 px-6 mt-4">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    {children}
                </ScrollView>
            </View>

            {/* Bottom Buttons */}
            <View className="w-full px-6 pb-4">
                {nextRoute === "description" ? (
                    <TouchableOpacity
                        onPress={() => {
                            handleNext();
                            router.push(`${ROUTES.DASHBOARD.EVENT.NEW.INDEX}/${nextRoute}`);
                        }}
                        className={`bg-[#00AA55] mx-auto w-full items-center justify-center py-5 rounded-full ${!isInputValid && "opacity-50"}`}
                        disabled={!isInputValid}
                    >
                        <Text className="text-white text-xl font-bold">Next</Text>
                    </TouchableOpacity>
                ) : nextInfor === "Make Event" ? (
                    <View className="w-full px-10" style={tailwind`my-3 flex flex-col gap-5`}>
                        <TouchableOpacity
                            onPress={handleAccept}
                            className="bg-[#00AA55] mx-auto items-center justify-center py-3 rounded-full"
                            style={tailwind`w-full`}
                        >
                            <Text className="text-white text-xl font-outfitBold py-1.5">Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleRegenerateVendor}
                            className="mx-auto items-center justify-center py-3 rounded-full bg-[#19ff8c]"
                            style={tailwind`w-full`}
                        >
                            <Text className="text-white text-xl font-outfitBold py-1.5">Regenerate</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="flex flex-row justify-between mt-12">
                        <TouchableOpacity
                            onPress={handleBack}
                            className="mx-auto w-[30%] items-center justify-center rounded-full bg-red-500 p-4"
                        >
                            <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                handleNext();
                                router.push(`/dashboard/make-event/${nextRoute}`);
                            }}
                            className={`bg-[#00AA55] mx-auto w-[60%] items-center justify-center py-3 rounded-full ${!isInputValid && "opacity-50"}`}
                            disabled={!isInputValid}
                        >
                            <Text className="text-white text-xl font-bold">Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default MakeEventLayout;