import { View, Text, TextInput } from "react-native";
import React from "react";
import MakeEventLayout from "../../app/dashboard/make-event";
// import MakeEventLayout from "../dashboard/(tabs)/MakeEventLayout";
import tailwind from "twrnc";

const MakeEventTheme = () => {
    return (
        <MakeEventLayout progress={60} nextRoute="./makeEvent-capacityEvent">
            <View className="px-10" style={tailwind`mt-5`}>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
          What Event
                </Text>
                <Text className="text-6xl font-outfitExtraBold">Theme?</Text>
            </View>
            <View className="flex flex-col gap-4 w-full mt-12 px-10">
                <View className="flex flex-col gap-2">
                    <Text className="font-outfitRegular">Event Theme</Text>
                    <TextInput
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your event theme"
                    />
                </View>
            </View>
        </MakeEventLayout>
    );
};

export default MakeEventTheme;
