import { View, Text, ScrollView } from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import tailwind from "twrnc";

const DetailRequest = ({ navigation }) => {
  return (
    <View className="flex-1 items-start justify-center bg-white">
      <View className="w-full h-full pt-10 px-10">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 bg-[#00F279] rounded-full self-start"
        >
          <AntDesignIcons name="arrowleft" size={20} color={"white"} />
        </TouchableOpacity>
        <View className="mt-5 border-b border-gray-300 w-full">
          <Text className="w-full text-5xl font-outfitBold pb-4">
            Detail Order
          </Text>
        </View>
        <View className="h-[50%]">
          <ScrollView className="">
            <View className="py-2">
              <Text className="text-xl font-outfitRegular text-gray-500">
                Nama Event
              </Text>
              <Text className="text-xl font-outfitSemiBold">
                Pengajian Akbar Maulid
              </Text>
            </View>
            <View className="py-2">
              <Text className="text-xl font-outfitRegular text-gray-500">
                Date Event
              </Text>
              <View className="flex flex-row gap-4">
                <Text className="text-xl font-outfitSemiBold">20 November</Text>
                <Text className="text-xl font-outfitSemiBold">-</Text>
                <Text className="text-xl font-outfitSemiBold">20 November</Text>
              </View>
            </View>
            <View className="py-2">
              <Text className="text-xl font-outfitRegular text-gray-500">
                Capacity
              </Text>
              <Text className="text-xl font-outfitSemiBold">1000</Text>
            </View>
            <View className="py-2">
              <Text className="text-lg font-outfitRegular text-gray-500">
                Address
              </Text>
              <Text className="text-lg font-outfitSemiBold">
                Jalan Sekartaji 1 No 20
              </Text>
            </View>
            <View className="py-2">
              <Text className="text-lg font-outfitRegular text-gray-500">
                Status
              </Text>
              <View
                className="bg-[#00F279] p-2 rounded-full"
                style={{ width: 100 }}
              >
                <Text className="text-white text-center">PAID</Text>
              </View>
            </View>
            <View className="py-2">
              <Text className="text-lg font-outfitRegular text-gray-500">
                List Vendor Choose
              </Text>
              <View
                className="flex flex-row gap-4 w-full items-center "
                style={[tailwind`mt-2`]}
              >
                <View
                  className="flex flex-row gap-2"
                  style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-xl`]}
                >
                  <Text className="font-outfitSemiBold text-xl">
                    Entertaiment
                  </Text>
                  <Text
                    className="font-outfitRegular text-xl"
                    style={{ textAlign: "right", flex: 1 }}
                  >
                    10.000.000
                  </Text>
                </View>
              </View>
              <View
                className="flex flex-row gap-4 w-full items-center "
                style={[tailwind`mt-2`]}
              >
                <View
                  className="flex flex-row gap-2"
                  style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-xl`]}
                >
                  <Text className="font-outfitSemiBold text-xl">
                    Entertaiment
                  </Text>
                  <Text
                    className="font-outfitRegular text-xl"
                    style={{ textAlign: "right", flex: 1 }}
                  >
                    10.000.000
                  </Text>
                </View>
              </View>
              <View
                className="flex flex-row gap-4 w-full items-center "
                style={[tailwind`mt-2`]}
              >
                <View
                  className="flex flex-row gap-2"
                  style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-xl`]}
                >
                  <Text className="font-outfitSemiBold text-xl">
                    Entertaiment
                  </Text>
                  <Text
                    className="font-outfitRegular text-xl"
                    style={{ textAlign: "right", flex: 1 }}
                  >
                    10.000.000
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View className="flex flex-col gap-2 w-full mt-3 items-center justify-center">
          <TouchableOpacity className="bg-[#00F279] items-center justify-center px-8 py-3 rounded-full w-full">
            <Text className="text-white text-xl font-bold">Pay Now!</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 items-center justify-center px-8 py-3 rounded-full w-full">
            <Text className="text-white text-xl font-bold">Cancel Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DetailRequest;
