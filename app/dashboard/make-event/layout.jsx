import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ProgressBar } from "@/components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "twrnc";
import { useDispatch, useSelector } from "react-redux";

const MakeEventLayout = ({
  progress,
  children,
  nextRoute,
  handleAccept,
  handleNext,
  handleRegenerateVendor,
  nextInfor,
  isInputValid,
  resetRecommendedList,
}) => {
  const dispatch = useDispatch();

  return (
    <View className="flex-1 justify-center bg-white">
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          backgroundColor: "red",
          borderRadius: 50,
          padding: 10,
        }}
        onPress={() => {
          resetRecommendedList();
          router.back();
        }}
      >
        <MaterialCommunityIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View
        className={`w-[90%] px-10 ${
          // nextRoute === "where"
          //   ? "mt-2"
          //   : nextRoute === "./makeEvent-capacityEvent"
          //   ? "mt-10"
          //   : "mt-6"
          nextRoute === "description"
            ? "mt-2"
            : nextRoute === "./makeEvent-capacityEvent"
            ? "mt-10"
            : "mt-6"
        }`}
      >
        <ProgressBar progress={progress} variant="success" />
      </View>
      <View className="px-10" style={tailwind`mt-1 h-[60%] mt-4`}>
        {nextRoute === "when" ? children : <ScrollView>{children}</ScrollView>}
      </View>
      {nextRoute === "description" ? (
        <View className="w-full px-10 mt-10">
          <TouchableOpacity
            onPress={() => {
              handleNext();
              router.push(`/dashboard/make-event/${nextRoute}`);
            }}
            className={`bg-[#00AA55] mx-auto w-full mt-14 items-center justify-center py-3 rounded-full ${
              !isInputValid && "opacity-50"
            }`}
            disabled={!isInputValid}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      ) : nextInfor === "Make Event" ? (
        <View
          className="w-full px-10"
          style={[tailwind`my-3 flex flex-col gap-5`]}
        >
          <TouchableOpacity
            onPress={handleAccept}
            className="bg-[#00AA55] mx-auto mt-2 items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRegenerateVendor}
            className=" mx-auto items-center justify-center py-3 rounded-full"
            style={[tailwind`w-full bg-[#19ff8c]`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Regenerate
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          className="w-full px-10 flex flex-row justify-between"
          style={[tailwind`mt-12`]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="mx-auto w-[30%] mt-14 items-center justify-center rounded-full"
            style={[tailwind`bg-red-500 p-4`]}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleNext();
              router.push(`/dashboard/make-event/${nextRoute}`);
            }}
            className={`bg-[#00AA55] mx-auto w-[60%] mt-14 items-center justify-center py-3 rounded-full ${
              !isInputValid && "opacity-50"
            }`}
            disabled={!isInputValid}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MakeEventLayout;
