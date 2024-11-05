import {FlatList, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { loadRequestListVendor, setSelectedRequest } from '@/redux/slices/requestListVendorSlice';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ScrollView } from  'react-native'

export default function ListRequestScreen() {
    const dispatch = useDispatch();
    const { requestListVendor, selectedRequest } = useSelector(
      (state) => state.requestListVendor
    );
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
  
    useEffect(() => {
      dispatch(loadRequestListVendor());
    }, [dispatch]);
  
    // const historyItems = [
    //   {
    //     id: 1,
    //     date: "20/12/2024",
    //     location: "Malang, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 2,
    //     date: "21/12/2024",
    //     location: "Jakarta, Indonesia",
    //     status: "Failed",
    //   },
    //   {
    //     id: 3,
    //     date: "22/12/2024",
    //     location: "Surabaya, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 4,
    //     date: "23/12/2024",
    //     location: "Bandung, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 5,
    //     date: "24/12/2024",
    //     location: "Bali, Indonesia",
    //     status: "Failed",
    //   },
    //   {
    //     id: 6,
    //     date: "25/12/2024",
    //     location: "Yogyakarta, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 7,
    //     date: "26/12/2024",
    //     location: "Solo, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 8,
    //     date: "27/12/2024",
    //     location: "Malang, Indonesia",
    //     status: "Failed",
    //   },
    //   {
    //     id: 9,
    //     date: "28/12/2024",
    //     location: "Jakarta, Indonesia",
    //     status: "Success",
    //   },
    //   {
    //     id: 10,
    //     date: "29/12/2024",
    //     location: "Surabaya, Indonesia",
    //     status: "Failed",
    //   },
    //   {
    //     id: 11,
    //     date: "30/12/2024",
    //     location: "Bandung, Indonesia",
    //     status: "Failed",
    //   },
    // ];
  
    console.log(requestListVendor);

    const formatDate = (date) => {
        return moment(date).format('DD/MM/YYYY')
    }


    const filteredItems =
      selected === "All"
        ? requestListVendor
        : requestListVendor.filter((item) => item.status === selected);

    const handleSelectedItem = (item) => {
      dispatch(setSelectedRequest(item));
      router.push("/dashboard/request/detail");
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
        onPress={() => handleSelectedItem(item)}
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
            item.approvalStatus === "Approved" ? "bg-[#00AA55]" : "bg-[#FF0000]"
          } rounded-xl`}
        >
          <View>
            <Text className="text-md font-outfitSemiBold text-white">
              {formatDate(item.date)}
            </Text>
            <Text className="text-xl font-outfitBold text-white">
              {item.eventName}
            </Text>
          </View>

          <View className="p-3 bg-white rounded-full">
            <AntDesignIcons
              name="right"
              size={24}
              color={item.status === "Success" ? "#00AA55" : "red"}
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
                Request
              </Text>
              {/* <View className="h-1 bg-[#00AA55] w-24 rounded-full mt-1" /> */}
            </View>
          </View>
  
          <View className="mt-6">
            <View className="flex flex-row justify-around relative bg-gray-100 p-4 rounded-full">
              {["All", "Accepted", "Pending"].map((item, index) => (
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
                        : selected === "Success"
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
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
      </View>)
}
