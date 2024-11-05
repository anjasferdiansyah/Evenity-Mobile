import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import tailwind from "twrnc";
import {router} from "expo-router";

const OrderDetailUser = () => {
    return (
      <View className="flex-1 bg-white">
        <View className="w-full h-full pt-10 px-5">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 bg-[#00F279] rounded-full"
          >
            <AntDesignIcons name="arrowleft" size={20} color={"white"} />
          </TouchableOpacity>
          {/* Header Section */}
          <View className="mt-5 border-b border-gray-300 pb-4">
            <Text className="text-5xl font-outfitBold text-gray-800">
              Detail Order
            </Text>
          </View>
          {/* Scrollable Content */}
          <View className="h-[50%] mt-5">
            <ScrollView>
              {/* Event Name */}
              <View className="py-2">
                <Text className="text-lg font-outfitRegular text-gray-500">
                  Nama Event
                </Text>
                <Text className="text-2xl font-outfitSemiBold text-gray-800">
                  Pengajian Akbar Maulid
                </Text>
              </View>
              {/* Event Date */}
              <View className="py-2">
                <Text className="text-lg font-outfitRegular text-gray-500">
                  Date Event
                </Text>
                <View className="flex flex-row gap-2">
                  <Text className="text-xl font-outfitSemiBold text-gray-800">
                    20 November
                  </Text>
                  <Text className="text-xl font-outfitSemiBold text-gray-800">
                    -
                  </Text>
                  <Text className="text-xl font-outfitSemiBold text-gray-800">
                    20 November
                  </Text>
                </View>
              </View>
              {/* Capacity */}
              <View className="py-2">
                <Text className="text-lg font-outfitRegular text-gray-500">
                  Capacity
                </Text>
                <Text className="text-xl font-outfitSemiBold text-gray-800">
                  1000
                </Text>
              </View>
              {/* Address */}
              <View className="py-2">
                <Text className="text-lg font-outfitRegular text-gray-500">
                  Address
                </Text>
                <Text className="text-xl font-outfitSemiBold text-gray-800">
                  Jalan Sekartaji 1 No 20
                </Text>
              </View>
              {/* Status */}
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
              {/* List of Vendors */}
              <View className="py-2">
                <Text className="text-lg font-outfitRegular text-gray-500">
                  List Vendor Choose
                </Text>
                {Array(3)
                  .fill()
                  .map((_, index) => (
                    <View
                      key={index}
                      className="flex flex-row gap-4 w-full items-center mt-2"
                    >
                      <View className="flex flex-row gap-2 bg-slate-200 p-4 rounded-xl w-full">
                        <Text className="font-outfitSemiBold text-xl">
                          Entertainment
                        </Text>
                        <Text className="font-outfitRegular text-xl text-right flex-1">
                          10.000.000
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </ScrollView>
          </View>
          {/* Action Buttons */}
          <View className="flex flex-col gap-2 w-full mt-5 items-center">
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

export default OrderDetailUser;
