import {ScrollView, Text, TextInput, View} from "react-native";
import React from "react";
import {useDispatch} from "react-redux";
import tailwind from "twrnc";
import MakeEventLayout from "@/components/make-event/layout";
import {registMakeEvent} from "@/redux/slices/makeEventSlice";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventCapacitySchema} from "@/helper/validator/schema";
import BottomPadding from "@/components/misc/BottomPadding";

const MakeEventCapacity = () => {

    const dispatch = useDispatch();


    const {
        control,
        handleSubmit,
        formState: {errors, isValid},
    } = useForm({
        resolver: zodResolver(eventCapacitySchema),
    });

    const onSubmit = (data) => {

        dispatch(
            registMakeEvent({
                participant: parseInt(data.capacityEvent),
            })
        );

    };

    return (
        <MakeEventLayout
            progress={80}
            nextRoute="vendor"
            handleNext={handleSubmit(onSubmit)}
            isInputValid={isValid}
        >
            <ScrollView>
                <View className="px-10" style={tailwind`mt-5`}>
                    <Text className="text-6xl font-outfitSemiBold" style={tailwind``}>
                        How
                    </Text>
                    <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                        many
                    </Text>
                    <Text className="text-6xl font-outfitExtraBold">Guests?</Text>
                </View>
                <View className="flex flex-col gap-4 w-full mt-12 px-10">
                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular">Event Capacity</Text>
                        <Controller
                            control={control}
                            name="capacityEvent"
                            render={({field: {onChange, value}}) => (
                                <TextInput
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    placeholder="Enter your event capacity"
                                    keyboardType="numeric"
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.capacityEvent && <Text className="text-red-500">{errors.capacityEvent.message}</Text>}
                    </View>
                </View>
                <BottomPadding/>
            </ScrollView>
        </MakeEventLayout>
    );
};

export default MakeEventCapacity;
