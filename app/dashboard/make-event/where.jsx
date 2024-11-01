import {Text, TextInput, View,} from "react-native";
import React from "react";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";

const MakeEventLocation = () => {
    return (
        <MakeEventLayout progress={40} nextRoute="when">
            <View className="px-10" style={[tailwind`mt-5`]}>
                <Text
                    className="text-6xl font-outfitSemiBold"
                    style={[tailwind``]}
                >
                    Where's
                </Text>
                <Text
                    className="text-6xl font-outfitSemiBold"
                    style={[tailwind`mb-3`]}
                >
                    Event
                </Text>
                <Text className="text-6xl font-outfitExtraBold">location?</Text>
            </View>
            <View
                className="flex flex-col gap-4 w-full mt-12 px-10"
                style={[tailwind`mt-7`]}
            >
                <View className="flex flex-col gap-2">
                    <Text className="font-outfitRegular">Event Location</Text>
                    <TextInput
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your event location"
                    />
                </View>
                <View className="flex flex-col gap-2">
                    <Text className="font-outfitRegular">Subdistrict</Text>
                    <TextInput
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Enter your event subdistrict"
                    />
                </View>
            </View>
        </MakeEventLayout>
    );
};

export default MakeEventLocation;
