import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import tailwind from "twrnc";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import moment from "moment";

const OrderDetailUser = () => {
  const { selectedHistoryEvent } = useSelector((state) => state.historyEvent);

  const formatDate = (date) => {
    return moment(date).format("DD MMM YYYY");
  };

  const getCityName = (city) => {
    return city.replace(/^(KABUPATEN|KOTA)\s+/i, "");
  };

  const totalCost = selectedHistoryEvent?.eventDetailResponseList?.reduce(
    (acc, item) => acc + (item.cost || 0),
    0
  );

  return (
    <View className="flex-1 bg-white">
      <View className="h-full pt-10 px-5">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-2 bg-[#00F279] rounded-full w-10 h-10"
        >
          <AntDesignIcons name="arrowleft" size={20} color={"white"} />
        </TouchableOpacity>
        <View className="mt-8 mb-4 rounded-md border-b border-gray-300 pb-4 ">
          {/* Main Title */}
          <Text className="text-3xl font-outfitSemiBold text-gray-800">
            Detail Order
          </Text>
        </View>

        <ScrollView className="h-[75%]">
          {/* Event Details in Card Style */}
          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Event Name
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {selectedHistoryEvent?.name}
            </Text>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Event Description
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {selectedHistoryEvent?.description}
            </Text>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Event Theme
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {selectedHistoryEvent?.theme}
            </Text>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Date Event
            </Text>
            <View className="flex flex-row gap-2">
              <Text className="text-xl font-outfitSemiBold text-gray-800">
                {formatDate(selectedHistoryEvent?.startDate)}
              </Text>
              <Text className="text-xl font-outfitSemiBold text-gray-800">
                -
              </Text>
              <Text className="text-xl font-outfitSemiBold text-gray-800">
                {formatDate(selectedHistoryEvent?.endDate)}
              </Text>
            </View>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Location
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {getCityName(selectedHistoryEvent?.city)},{" "}
              {selectedHistoryEvent?.province}
            </Text>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Address
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {selectedHistoryEvent?.address}
            </Text>
          </View>

          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Participant
            </Text>
            <Text className="text-xl font-outfitSemiBold text-gray-800">
              {selectedHistoryEvent?.participant}
            </Text>
          </View>

          {/* List of Vendors */}
          <View className="bg-white p-4 mb-4 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              List Vendor Choose
            </Text>
            {selectedHistoryEvent?.eventDetailResponseList.map(
              (item, index) => (
                <View
                  key={index}
                  className={`flex flex-row gap-4 w-full items-center mt-2`}
                >
                  <View
                    className={`flex flex-col gap-2 p-4 rounded-xl w-full ${
                      item.approvalStatus === "APPROVED"
                        ? "bg-[#DFF7E6]"
                        : item.approvalStatus === "REJECTED"
                        ? "bg-[#FDE4E1]"
                        : "bg-[#FFF7E6]"
                    }`}
                  >
                    <View>
                      <Text className="font-outfitSemiBold text-xl">
                        {item.productName}
                      </Text>
                      <Text className="font-outfitRegular text-sm">
                        {item.approvalStatus}
                      </Text>
                    </View>

                    <Text className="font-outfitRegular text-xl text-right flex-1">
                      {`Rp ${item.cost
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                    </Text>
                  </View>
                </View>
              )
            )}
          </View>

          {/* Total Price */}
          <View className="bg-white pb-32 rounded-xl shadow-lg">
            <Text className="text-lg font-outfitRegular text-gray-500">
              Total Cost
            </Text>
            <Text className="text-4xl font-outfitBold text-gray-800">
              {`Rp ${totalCost
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default OrderDetailUser;
