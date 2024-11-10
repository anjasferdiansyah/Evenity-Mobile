import {Alert, Text, TextInput, View} from "react-native";
// import MakeEventLayout from "../dashboard/(tabs)/MakeEventLayout";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {registMakeEvent} from "@/redux/slices/makeEventSlice";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/helper/validator/schema";

const MakeEventName = () => {
    const dispatch = useDispatch();

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
      } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues : {
            eventName: "",
            mode: "onChange",
        }
      });

    const onSubmit = (data) => {
        dispatch(
            registMakeEvent({
                name: data.eventName
            })
        );
    };


    console.log("Is input valid", isValid )

    return (
        <MakeEventLayout
            progress={20}
            nextRoute="description"
            handleNext={handleSubmit(onSubmit)}
            isInputValid={isValid}
        >
            <View className="px-10" style={tailwind`mt-5`}>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind``}>
                    Name
                </Text>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                    Your
                </Text>
                <Text className="text-6xl font-outfitExtraBold">Event?</Text>
            </View>
            <View className="flex flex-col gap-4 w-full mt-12 px-10">
                <View className="flex flex-col gap-2">
                    <Text className="font-outfitRegular">Event Name</Text>
                    <Controller
                        control={control} // menghubungkan dengan kontrol form
                        name="eventName" // nama field
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                placeholder="Enter your event name"
                                value={value}
                                onChangeText={onChange} // update nilai saat input berubah
                            />
                        )}
                    />
                       {errors.eventName && (
                        <Text style={tailwind`text-red-500`}>
                            {errors.eventName.message}
                        </Text>
                    )}
                </View>
                {/* <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Description</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="Enter your event name"
            value={description}
            onChangeText={setDescription}
          />
        </View> */}
            </View>
        </MakeEventLayout>  
    );
};

export default MakeEventName;
