import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const MakeEventDate = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);

  const dispatch = useDispatch();

  const showStartDatePickerHandler = () => setShowStartDatePicker(true);
  const showEndDatePickerHandler = () => setShowEndDatePicker(true);
  const showStartTimePickerHandler = () => setShowStartTimePicker(true);
  const showEndTimePickerHandler = () => setShowEndTimePicker(true);

  const validateInputs = () => {
    if (startDate && endDate && startTime && endTime) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };

  const validateDateRange = (selectedDate) => {
    const today = new Date();
    const selectedDateObj = new Date(selectedDate);

    // Check if startDate is at least 7 days from today
    const daysDifference = Math.floor(
      (selectedDateObj - today) / (1000 * 60 * 60 * 24)
    );
    if (daysDifference < 7) {
      Alert.alert(
        "Invalid Date",
        "Event must be scheduled at least 7 days in advance."
      );
      return false;
    }
    return true;
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      if (validateDateRange(selectedDate)) {
        setStartDate(selectedDate);
        validateInputs(); // Revalidate inputs after updating start date
      }
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      if (validateDateRange(selectedDate)) {
        setEndDate(selectedDate);
        validateInputs(); // Revalidate inputs after updating end date
      }
    }
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
    // if (!isInputValid) {
    //   Alert.alert("Invalid Input", "Please enter a valid event date and time.");
    //   return;
    // } else if (!validateDateRange()) {
    //   return;
    // }

    try {
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
    } catch (error) {
      Alert.alert(
        "Error",
        "An error occurred while creating the event. Please try again."
      );
    }
  };

  useEffect(() => {
    validateInputs();
  }, [startDate, endDate, startTime, endTime]);

  return (
    <MakeEventLayout
      progress={40}
      nextRoute="theme"
      handleNext={handleMakeEvent}
      isInputValid={isInputValid}
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
