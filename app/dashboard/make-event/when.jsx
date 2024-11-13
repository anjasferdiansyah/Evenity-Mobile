import {Alert, Text, TouchableOpacity, View} from "react-native";
import tailwind from "twrnc";
import MakeEventLayout from "@/components/make-event/layout";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {registMakeEvent} from "@/redux/slices/makeEventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {eventDateSchema} from "@/helper/validator/schema";
import BottomPadding from "@/components/misc/BottomPadding";

const MakeEventDate = () => {
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const dispatch = useDispatch();

    const {control, handleSubmit, setValue, formState: {errors, isValid}} = useForm({
        resolver: zodResolver(eventDateSchema),
    });

    const onSubmit = (data) => {
        try {
            dispatch(
                registMakeEvent({
                    startDate: data.startDate.toISOString().split("T")[0],
                    endDate: data.endDate.toISOString().split("T")[0],
                    startTime: data.startTime.toISOString().split("T")[1].split(".")[0],
                    endTime: data.endTime.toISOString().split("T")[1].split(".")[0],
                })
            );
        } catch (error) {
            Alert.alert(
                "Error",
                "An error occurred while creating the event. Please try again."
            );
        }
    };

    const onDateChange = (type, selectedDate) => {
        if (selectedDate) setValue(type, selectedDate, {shouldValidate: true});
    };

    return (
        <MakeEventLayout
            progress={40}
            nextRoute="theme"
            isInputValid={isValid}
            handleNext={handleSubmit(onSubmit)}
        >
            <View className="px-10" style={tailwind`mt-5`}>
                <Text className="text-6xl font-outfitSemiBold">When</Text>
                <Text className="text-6xl font-outfitSemiBold" style={tailwind`mb-3`}>
                    Your
                </Text>
                <Text className="text-6xl font-outfitExtraBold">Event?</Text>
            </View>

            <View className="flex flex-col gap-4 w-full mt-12 px-10">
                <View className="flex flex-col gap-2">
                    {/* Start Date Picker */}
                    <View className="flex flex-row gap-5">
                        <View className="w-1/2">
                            <Text className="font-outfitRegular mb-2">Start Date</Text>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TouchableOpacity
                                        onPress={() => setShowStartDatePicker(true)}
                                        className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    >
                                        <Text>{value ? value.toDateString() : "Select a date"}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            {showStartDatePicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowStartDatePicker(false);
                                        onDateChange("startDate", selectedDate);
                                    }}
                                />
                            )}
                            {errors.startDate && <Text className="text-red-500">{errors.startDate.message}</Text>}
                        </View>

                        {/* Start Time Picker */}
                        <View className="w-1/2">
                            <Text className="font-outfitRegular mb-2">Start Time</Text>
                            <Controller
                                name="startTime"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TouchableOpacity
                                        onPress={() => setShowStartTimePicker(true)}
                                        className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    >
                                        <Text>{value ? value.toLocaleTimeString() : "Select a time"}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            {showStartTimePicker && (
                                <DateTimePicker
                                    mode="time"
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, selectedTime) => {
                                        setShowStartTimePicker(false);
                                        onDateChange("startTime", selectedTime);
                                    }}
                                />
                            )}
                        </View>
                    </View>

                    {/* End Date Picker */}
                    <View className="flex flex-row gap-5">
                        <View className="w-1/2">
                            <Text className="font-outfitRegular mb-2">End Date</Text>
                            <Controller
                                name="endDate"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TouchableOpacity
                                        onPress={() => setShowEndDatePicker(true)}
                                        className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    >
                                        <Text>{value ? value.toDateString() : "Select a date"}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            {showEndDatePicker && (
                                <DateTimePicker
                                    mode="date"
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, selectedDate) => {
                                        setShowEndDatePicker(false);
                                        onDateChange("endDate", selectedDate);
                                    }}
                                />
                            )}
                            {errors.endDate && <Text className="text-red-500">{errors.endDate.message}</Text>}
                        </View>

                        {/* End Time Picker */}
                        <View className="w-1/2">
                            <Text className="font-outfitRegular mb-2">End Time</Text>
                            <Controller
                                name="endTime"
                                control={control}
                                render={({field: {onChange, value}}) => (
                                    <TouchableOpacity
                                        onPress={() => setShowEndTimePicker(true)}
                                        className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                                    >
                                        <Text>{value ? value.toLocaleTimeString() : "Select a time"}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                            {showEndTimePicker && (
                                <DateTimePicker
                                    mode="time"
                                    display="default"
                                    value={new Date()}
                                    onChange={(event, selectedTime) => {
                                        setShowEndTimePicker(false);
                                        onDateChange("endTime", selectedTime);
                                    }}
                                />
                            )}
                            {errors.endTime && <Text className="text-red-500">{errors.endTime.message}</Text>}
                        </View>
                    </View>
                </View>
            </View>
            <BottomPadding />
        </MakeEventLayout>
    );
};

export default MakeEventDate;
