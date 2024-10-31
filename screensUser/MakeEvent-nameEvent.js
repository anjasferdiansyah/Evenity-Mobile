import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ProgressBar } from "../components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MakeEventName = ({ navigation }) => {
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
        onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="close" size={24} color="white" />
      </TouchableOpacity>
      <View className="w-full px-10 mb-10 mt-10">
        <ProgressBar progress={20} variant="success" />
      </View>

      <View className="px-10 mt-12">
        <Text className="text-6xl font-outfitSemiBold mb-4">Name</Text>
        <Text className="text-6xl font-outfitSemiBold mb-4">Your</Text>
        <Text className="text-6xl font-outfitExtraBold">Event?</Text>
      </View>
      <View className="flex flex-col gap-4 w-full mt-12 px-10">
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Event Name</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="Enter your event name"
          />
        </View>
      </View>

      <View className="w-full px-10">
        <TouchableOpacity
          onPress={() => navigation.navigate("next")}
          className="bg-[#00AA55] mx-auto w-full mt-14 items-center justify-center py-3 rounded-full"
        >
          <Text className="text-white text-xl font-outfitBold py-1.5">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MakeEventName;
