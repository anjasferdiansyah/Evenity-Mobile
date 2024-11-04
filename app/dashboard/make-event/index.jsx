import { Text, TextInput, View } from "react-native";
// import MakeEventLayout from "../dashboard/(tabs)/MakeEventLayout";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";

const MakeEventName = () => {
  const [eventName, setEventName] = useState("");
  const dispatch = useDispatch();

  const handleMakeEvent = () => {
    dispatch(
      registMakeEvent({
        name: eventName,
      })
    );
  };

  return (
    <MakeEventLayout
      progress={20}
      nextRoute="where"
      handleNext={handleMakeEvent}
    >
      <View className="px-10" style={[tailwind`mt-5`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind``]}>
          Name
        </Text>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          Your
        </Text>
        <Text className="text-6xl font-outfitExtraBold">Event?</Text>
      </View>
      <View className="flex flex-col gap-4 w-full mt-12 px-10">
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Event Name</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="Enter your event name"
            value={eventName}
            onChangeText={setEventName}
          />
        </View>
      </View>
    </MakeEventLayout>
  );
};

export default MakeEventName;
