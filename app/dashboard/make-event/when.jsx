import { Text, TextInput, View, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";

const MakeEventDate = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const dispatch = useDispatch();

  const showStartDatePickerHandler = () => setShowStartDatePicker(true);
  const showEndDatePickerHandler = () => setShowEndDatePicker(true);
  const showStartTimePickerHandler = () => setShowStartTimePicker(true);
  const showEndTimePickerHandler = () => setShowEndTimePicker(true);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const onStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    if (selectedTime) setStartTime(selectedTime);
  };

  const onEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    if (selectedTime) setEndTime(selectedTime);
  };

  const handleMakeEvent = () => {
    dispatch(
      registMakeEvent({
        startDate:
          typeof startDate === "string"
            ? startDate.split("T")[0]
            : startDate.toISOString().split("T")[0],
        endDate:
          typeof endDate === "string"
            ? endDate.split("T")[0]
            : endDate.toISOString().split("T")[0],
        startTime:
          typeof startTime === "string" && startTime.includes("T")
            ? startTime.split("T")[1].split(".")[0]
            : startTime.toISOString().split("T")[1].split(".")[0],
        endTime:
          typeof endTime === "string" && endTime.includes("T")
            ? endTime.split("T")[1].split(".")[0]
            : endTime.toISOString().split("T")[1].split(".")[0],
      })
    );
  };

  return (
    <MakeEventLayout
      progress={40}
      nextRoute="theme"
      handleNext={handleMakeEvent}
    >
      <View className="px-10" style={[tailwind`mt-5`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind``]}>
          When
        </Text>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          Your
        </Text>
        <Text className="text-6xl font-outfitExtraBold">Event?</Text>
      </View>
      <View className="flex flex-col gap-4 w-full mt-12 px-10">
        <View className="flex flex-col gap-2">
          <View className="flex flex-row gap-5">
            <View className="w-1/2">
              <Text className="font-outfitRegular">Start Date</Text>
              <TouchableOpacity
                onPress={showStartDatePickerHandler}
                className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              >
                <Text>
                  {startDate ? startDate.toDateString() : "Select a date"}
                </Text>
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={startDate || new Date()}
                  onChange={onStartDateChange}
                />
              )}
            </View>
            <View className="w-1/2">
              <Text className="font-outfitRegular">Start Time</Text>
              <TouchableOpacity
                onPress={showStartTimePickerHandler}
                className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              >
                <Text>
                  {startTime ? startTime.toLocaleTimeString() : "Select a time"}
                </Text>
              </TouchableOpacity>
              {showStartTimePicker && (
                <DateTimePicker
                  mode="time"
                  display="default"
                  value={startTime || new Date()}
                  onChange={onStartTimeChange}
                />
              )}
            </View>
          </View>
          <View className="flex flex-row gap-5">
            <View className="w-1/2">
              <Text className="font-outfitRegular">End Date</Text>
              <TouchableOpacity
                onPress={showEndDatePickerHandler}
                className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              >
                <Text>
                  {endDate ? endDate.toDateString() : "Select a date"}
                </Text>
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="default"
                  value={endDate || new Date()}
                  onChange={onEndDateChange}
                />
              )}
            </View>
            <View className="w-1/2">
              <Text className="font-outfitRegular">End Time</Text>
              <TouchableOpacity
                onPress={showEndTimePickerHandler}
                className="border-[0.5px] py-3 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              >
                <Text>
                  {endTime ? endTime.toLocaleTimeString() : "Select a time"}
                </Text>
              </TouchableOpacity>
              {showEndTimePicker && (
                <DateTimePicker
                  mode="time"
                  display="default"
                  value={endTime || new Date()}
                  onChange={onEndTimeChange}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    </MakeEventLayout>
  );
};

export default MakeEventDate;
