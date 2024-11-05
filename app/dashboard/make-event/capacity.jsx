import { View, Text, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "twrnc";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import { registMakeEvent } from "@/redux/slices/makeEventSlice";
import { loadCategories } from "@/redux/slices/categorySlice";

const MakeEventCapacity = () => {
  const [capacityEvent, setCapacityEvent] = useState(0);
  const dispatch = useDispatch();

  const handleMakeEvent = () => {
    dispatch(
      registMakeEvent({
        participant: parseInt(capacityEvent),
      })
    );
  };

  return (
    <MakeEventLayout
      progress={80}
      nextRoute="vendor"
      handleNext={handleMakeEvent}
    >
      <View className="px-10" style={[tailwind`mt-5`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind``]}>
          How
        </Text>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          many
        </Text>
        <Text className="text-6xl font-outfitExtraBold">Guests?</Text>
      </View>
      <View className="flex flex-col gap-4 w-full mt-12 px-10">
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Event Capacity</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="Enter your event capacity"
            keyboardType="numeric"
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              setCapacityEvent(numericValue);
            }}
          />
        </View>
      </View>
    </MakeEventLayout>
  );
};

export default MakeEventCapacity;
