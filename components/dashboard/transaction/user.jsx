import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import tailwind from "twrnc";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { historyOrderCustomer, setSelectedOrderUser } from "@/redux/slices/orderUserSlice";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import moment from "moment";
import { loadInvoiceOrderCustomer, setSelectedInvoiceCustomer } from "@/redux/slices/invoiceCustomerSlice";

const OrderHistoryUser = () => {
  const dispatch = useDispatch();

  const { id } = useSelector((state) => state.auth)
  // const { ordersUser  } = useSelector((state) => state.orderUser)
  const { invoiceCustomer } = useSelector((state) => state.invoiceCustomer)

  // console.log("invoiceCustomer", invoiceCustomer)

  const { width } = useWindowDimensions();

  const [selected, setSelected] = useState("All");

  const slideAnim = useSharedValue(0);
  const paddingHorizontal = 20;
  const itemWidth = (width - paddingHorizontal * 2) / 3;

  const handlePress = (item, index) => {
    setSelected(item);
    slideAnim.value = withTiming(index * itemWidth, { duration: 300 });
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: slideAnim.value }],
  }));

  // useEffect(() => {
  //   dispatch(historyOrderCustomer(id));

  // }, []);

useEffect(() => {
  dispatch(loadInvoiceOrderCustomer(id))
}, [])

const filteredItems =
  selected === "All"
    ? invoiceCustomer
    : selected === "Approved"
    ? invoiceCustomer.filter((item) =>
        item.invoiceDetailResponseList?.every(
          (detail) => detail.approvalStatus === "APPROVED"
        )
      )
    : invoiceCustomer.filter((item) =>
        item.invoiceDetailResponseList?.some(
          (detail) => detail.approvalStatus !== "APPROVED"
        )
      );

  // console.log(invoiceCustomer)

  const formatedDate = (date) => {
    return moment(date).format('DD MMM YYYY')
}

const handleSelectedDetail = (item) => {
  dispatch(setSelectedInvoiceCustomer(item))
  router.push("/dashboard/transaction/detail")
}



  const renderItem = ({ item }) => (
    <TouchableOpacity
    onPress={() => handleSelectedDetail(item)}
    key={item.id}
    style={{
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 4,
      padding: 10,
    }}
  >
    <View
      className={`flex flex-row justify-between items-center p-5 ${
        item.paymentStatus === "COMPLETE" ? "bg-[#DFF7E6]" : "bg-[#FDE4E1]"
      } rounded-xl`}
    >
      <View>
        <Text className="text-xl font-outfitBold text-gray-800">
          {item.eventName}
        </Text>
        <Text className="text-sm font-outfitRegular text-gray-500">
          {formatedDate(item.startDate)}
        </Text>
      </View>

      <View className="p-3 bg-white rounded-full">
        <AntDesignIcons
          name="right"
          size={24}
          color={ item.paymentStatus === "COMPLETE" ? "#00AA55" : "red"}
        />
      </View>
    </View>
  </TouchableOpacity>
  )

 

  return (
    <View className="flex-1 bg-gray-50">
      <View className="w-full h-full pt-14 px-6">
        <View className="flex flex-col items-center">
          <Text className="text-2xl font-outfitBold text-center text-gray-800 mb-1">
            Order
          </Text>
          <View className="flex flex-col items-center">
            <Text className="text-4xl font-outfitBold text-center text-[#00AA55]">
              History
            </Text>
            {/* <View className="h-1 bg-[#00AA55] w-24 rounded-full mt-1" /> */}
          </View>
        </View>

        <View className="mt-6">
          <View className="flex flex-row justify-around relative bg-gray-100 p-4 rounded-full">
            {["All", "Approved", "Failed"].map((item, index) => (
              <TouchableOpacity
                key={item}
                onPress={() => handlePress(item, index)}
                style={{
                  width: itemWidth,
                  alignItems: "center",
                  paddingVertical: 2,
                }}
              >
                <Text
                  style={{
                    color: selected === item ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: 16,
                    backgroundColor:
                      selected === item ? "#00AA55" : "transparent",
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}

            <Animated.View
              style={[
                animatedIndicatorStyle,
                {
                  position: "absolute",
                  bottom: -2,
                  left:
                    selected === "All"
                      ? 25
                      : selected === ""
                      ? itemWidth - 109
                      : itemWidth - 120,
                  width: itemWidth - 30, // Adjust this value based on your design
                  height: 3,
                  backgroundColor: "#00AA55",
                  borderRadius: 2,
                },
              ]}
            />
          </View>
        </View>


          <View className="list-history space-y-4 mt-6">
              <FlatList
              data={filteredItems}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              />
          </View>

      </View>
    </View>
  );
};

export default OrderHistoryUser;
