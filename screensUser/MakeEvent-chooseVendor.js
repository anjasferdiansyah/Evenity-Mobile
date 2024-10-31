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

const ChooseVendor = ({ navigation }) => {
  const entertainmentItems = [
    { id: 1, name: "Entertainment 1", price: "10.000.000" },
    { id: 2, name: "Entertainment 2", price: "15.000.000" },
    { id: 3, name: "Entertainment 2", price: "15.000.000" },
    { id: 4, name: "Entertainment 2", price: "15.000.000" },
  ];

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
      <View className="w-full px-10" style={[tailwind`mt-23 mb-5`]}>
        <ProgressBar progress={80} variant="success" />
      </View>

      <View className="px-10" style={[tailwind`my-2`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          Choose
        </Text>

        <Text className="text-6xl font-outfitExtraBold">Vendor?</Text>
      </View>
      <View
        className="flex flex-col gap-4 w-full mt-12 px-10"
        style={[tailwind`mt-2`]}
      >
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Vendor Type</Text>
          <TextInput
            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
            placeholder="Choose vendor"
          />
        </View>
        <View className="flex flex-row gap-2">
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Lowest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder="Lowest price"
            />
          </View>
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Highest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder="Highest price"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("MakeEventCapacity")}
            className="mx-auto mt-4 items-center justify-center rounded-full"
            style={[tailwind`bg-[#00AA55] p-4`]}
          >
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={[tailwind`mt-5 `]} className="vendor-choosen">
        {entertainmentItems.map((item) => (
          <View
            key={item.id}
            className="flex flex-row gap-4 w-full px-10 items-center "
            style={[tailwind`mt-2`]}
          >
            <View
              className="flex flex-row gap-2"
              style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-full`]}
            >
              <Text className="font-outfitSemiBold text-xl">Entertaiment</Text>
              <Text
                className="font-outfitRegular text-xl"
                style={{ textAlign: "right", flex: 1 }}
              >
                10.000.000
              </Text>
            </View>
            <TouchableOpacity>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <View
        className="w-full px-10 flex flex-row justify-between"
        style={[tailwind`my-3`]}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("MakeEventCapacity")}
          className=" mx-auto w-[30%] mt-14 items-center justify-center rounded-full"
          style={[tailwind`bg-red-500 p-4`]}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MakeEventTransactionNote")}
          className="bg-[#00AA55] mx-auto mt-14 items-center justify-center py-3 rounded-full"
          style={[tailwind`w-[80%]`]}
        >
          <Text className="text-white text-xl font-outfitBold py-1.5">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseVendor;
