import { Text, TextInput, View, Alert } from "react-native";
// import MakeEventLayout from "../dashboard/(tabs)/MakeEventLayout";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";

const MakeEventName = () => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [isInputValid, setIsInputValid] = useState(false);

  const validateInputs = () => {
    if (description.length > 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };
  const handleMakeEvent = () => {
    if (!isInputValid) {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid event name and description."
      );
      return;
    }

    dispatch(
      registMakeEvent({
        description: description,
      })
    );
  };

  useEffect(() => {
    validateInputs();
  }, [description]);

  return (
    <MakeEventLayout
      progress={30}
      nextRoute="where"
      handleNext={handleMakeEvent}
      isInputValid={isInputValid}
    >
      <View className="px-10" style={[tailwind`mt-5`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind``]}>
          Describe
        </Text>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          Your
        </Text>
        <Text className="text-6xl font-outfitExtraBold">Event</Text>
      </View>
      <View className="flex flex-col gap-4 w-full mt-12 px-10">
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Event Description</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="my event is about ..."
            value={description}
            onChangeText={setDescription}
            multiline={true} 
            numberOfLines={7} 
            textAlignVertical="top"
          />
        </View>
      </View>
    </MakeEventLayout>
  );
};

export default MakeEventName;
