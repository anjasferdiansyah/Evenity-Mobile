import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {historyOrderCustomer} from "@/redux/slices/request-requestDetail-slice";

export function OrderHistoryVendor() {
    const dispatch = useDispatch();
    const {isLoading, requestDetail, status, error} = useSelector(
        (state) => state.requestDetail
    );

    useEffect(() => {
        dispatch(historyOrderCustomer());
    }, [dispatch]);


    const renderItem = ({item}) => (
        <View
            key={item.id}
            className="flex flex-row justify-between items-center mt-5 p-6 bg-[#00F279] rounded-full"
        >
            <View>
                <Text className="text-3xl font-outfitBold text-center text-white">
                    {item.date}
                    {/* {formatDate(item.date)} */}
                </Text>
                <Text className="font-outfitRegular text-center text-white">
                    {item.location}
                </Text>
            </View>
            <TouchableOpacity
                onPress={() => router.push("dashboard/transaction/detail")}
                className="p-4 bg-white rounded-full"
            >
                <AntDesignIcons name="right" size={30} color={"#00AA55"}/>
            </TouchableOpacity>
        </View>
    );


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
                            onPress={() => router.push("dashboard/transaction/withdraw/history")}
                            className="bg-[#00AA55] px-8 py-4 w-[40%] rounded-full"
                        >
                            <Text className="text-white text-center font-outfitBold">
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={requestDetail}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{
                        paddingBottom: 10
                    }}
                />
            </View>
        </View>
    );
}
