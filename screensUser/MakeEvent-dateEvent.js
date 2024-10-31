import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { ProgressBar } from "../components/progress-bar";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import tailwind from "twrnc";

const MakeEventDate = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
        <View className="w-full px-10 mb-10" style={[tailwind`mt-5`]}>
          <ProgressBar progress={50} variant="success" />
        </View>

        <View className="px-10">
          <Text
            className="text-6xl font-outfitSemiBold"
            style={[tailwind`mb-2`]}
          >
            When's
          </Text>
          <Text
            className="text-6xl font-outfitSemiBold"
            style={[tailwind`mb-2`]}
          >
            Your
          </Text>
          <Text className="text-6xl font-outfitExtraBold">Event?</Text>
        </View>
        <View
          className="flex flex-col gap-4 w-full mt-12 px-10"
          style={[tailwind`mt-7`]}
        >
          <View className="flex flex-col gap-2">
            <Text className="font-outfitRegular">Start Date</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              placeholder="Enter event start date"
            />
          </View>
          <View className="flex flex-col gap-2">
            <Text className="font-outfitRegular">End Date</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
              placeholder="Enter event end date"
            />
          </View>
        </View>

        <View className="w-full px-10 flex flex-row justify-between">
          <TouchableOpacity
            onPress={() => navigation.navigate("next")}
            className=" mx-auto w-[30%] mt-14 items-center justify-center rounded-full"
            style={[tailwind`bg-red-500 p-4`]}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("next")}
            className="bg-[#00AA55] mx-auto mt-14 items-center justify-center py-3 rounded-full"
            style={[tailwind`w-[80%]`]}
          >
            <Text className="text-white text-xl font-outfitBold py-1.5">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakeEventDate;
