import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { historyOrderCustomer } from "@/redux/slices/request-requestDetail-slice";

const HistoryOrderScreen = () => {
  const dispatch = useDispatch();
  const { isLoading, requestDetail, status, error } = useSelector(
    (state) => state.requestDetail
  );
  const [listRequestDetail, setListRequestDetail] = useState([]);

  const historyItems = [
    {
      id: 1,
      date: "20/12/2024",
      location: "Malang, Indonesia",
    },
    {
      id: 2,
      date: "21/12/2024",
      location: "Jakarta, Indonesia",
    },
    {
      id: 3,
      date: "22/12/2024",
      location: "Surabaya, Indonesia",
    },
    {
      id: 4,
      date: "23/12/2024",
      location: "Bandung, Indonesia",
    },
    {
      id: 5,
      date: "24/12/2024",
      location: "Bali, Indonesia",
    },
  ];

  useEffect(() => {
    dispatch(historyOrderCustomer());
  }, [dispatch]);


// jangan dihapus
//   useEffect(() => {
//     if (requestDetail && requestDetail.length > 0) {
//       setListRequestDetail(requestDetail);
//     } else {
//       setListRequestDetail(historyItems);
//     }
//   }, [requestDetail, historyItems]);

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-full pt-20 px-10">
        <View className="border-b border-gray-400 pb-10">
          <Text className="text-lg font-outfitBold pb-4 text-gray-500 text-center">
            Your Active balance
          </Text>
          <Text className="text-5xl font-outfitBold pb-4 text-center">
            Rp. 2.000.000
          </Text>
          <View className="flex flex-row justify-center gap-4">
            <TouchableOpacity
              onPress={() => router.push("dashboard/transaction/withdraw")}
              className="bg-[#00F279] px-8 py-4 w-[40%] rounded-full"
            >
              <Text className="text-white font-outfitBold text-center">
                Withdraw
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("dashboard/transaction/history")}
              className="bg-[#00AA55] px-8 py-4 w-[40%] rounded-full"
            >
              <Text className="text-white text-center font-outfitBold">
                History
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {listRequestDetail.map((item) => (
            <View
              key={item.id}
              className="flex flex-row justify-between items-center mt-10 p-6 bg-[#00F279] rounded-full"
            >
              <View>
                <Text className="text-3xl font-outfitBold text-center text-white">
                  {item.date}
                </Text>
                <Text className="font-outfitRegular text-center text-white">
                  {item.location}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => router.push("dashboard/transaction/detail")}
                className="p-4 bg-white rounded-full"
              >
                <AntDesignIcons name="right" size={30} color={"#00AA55"} />
              </TouchableOpacity>
            </View>
          ))}

          {/* <View className="flex flex-row justify-between items-center mt-10 p-6 bg-[#00F279] rounded-full">
            <View>
              <Text className="text-3xl font-outfitBold text-center text-white">
                20/12/2024
              </Text>
              <Text className="font-outfitRegular text-center text-white">
                Malang, Indonesia
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("dashboard/transaction/detail")}
              className="p-4 bg-white rounded-full"
            >
              <AntDesignIcons name="right" size={30} color={"#00AA55"} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between items-center mt-10 p-6 bg-[#00F279] rounded-full">
            <View>
              <Text className="text-3xl font-outfitBold text-center text-white">
                20/12/2024
              </Text>
              <Text className="font-outfitRegular text-center text-white">
                Malang, Indonesia
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.push("dashboard/transaction/detail")}
              className="p-4 bg-white rounded-full"
            >
              <AntDesignIcons name="right" size={30} color={"#00AA55"} />
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
};

export default HistoryOrderScreen;
