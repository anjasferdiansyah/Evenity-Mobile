import { Alert, Text, TextInput, View } from "react-native";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { descriptionSchema } from "@/helper/validator/schema"; // pastikan ini schema Zod Anda

const MakeEventName = () => {
    const dispatch = useDispatch();
    
    // Setup useForm hook dengan resolver dari Zod
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        resolver: zodResolver(descriptionSchema), // Gunakan zodResolver untuk validasi
        mode: "onChange", // Memastikan validasi dijalankan setiap input berubah
    });

    // Fungsi yang dipanggil ketika tombol Next diklik
    const handleMakeEvent = (data) => {
        dispatch(
            registMakeEvent({
                description: data.description,
            })
        );
    };

    return (
        <MakeEventLayout
            progress={30}
            nextRoute="where"
            handleNext={handleSubmit(handleMakeEvent)} // hanya submit jika form valid
            isInputValid={isValid} // Menyampaikan status validasi ke MakeEventLayout
        >
            <View className="px-10" style={tailwind`mt-5`}>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind``}>
                    Describe
                </Text>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                    Your
                </Text>
                <Text className="text-6xl font-outfitExtraBold">Event</Text>
            </View>
            <View className="flex flex-col gap-4 w-full mt-12 px-10">
                <View className="flex flex-col gap-2">
                    <Text className="font-outfitRegular">Event Description</Text>
                    <Controller
                        control={control}
                        name="description" // nama field
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                placeholder="my event is about ..."
                                value={value}
                                onChangeText={onChange} // update nilai saat input berubah
                                multiline={true}
                                numberOfLines={7}
                                textAlignVertical="top"
                            />
                        )}
                    />
                    {errors.description && (
                        <Text style={tailwind`text-red-500`}>
                            {errors.description.message}
                        </Text>
                    )}
                </View>
            </View>
        </MakeEventLayout>
    );
};

export default MakeEventName;
