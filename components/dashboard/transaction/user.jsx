import React, {useEffect, useState} from "react";
import {FlatList, StatusBar, Text, TouchableOpacity, View} from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {SafeAreaView} from "react-native-safe-area-context";
import {ROUTES} from "@/constant/ROUTES";
import {loadInvoiceOrderCustomer, setSelectedInvoiceCustomer} from "@/redux/slices/invoiceCustomerSlice";

const OrderHistoryUser = () => {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.auth);
    const {invoiceCustomer} = useSelector((state) => state.invoiceCustomer);

    const [selected, setSelected] = useState("All");

    useEffect(() => {
        dispatch(loadInvoiceOrderCustomer(id));
    }, [dispatch, id]);

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

    const formatedDate = (date) => moment(date).format('DD MMM YYYY');

    const handleSelectedDetail = (item) => {
        dispatch(setSelectedInvoiceCustomer(item));
        router.push(ROUTES.DASHBOARD.TRANSACTION.DETAIL);
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => handleSelectedDetail(item)}
            className="mb-4 px-6"
        >
            <View
                className={`relative overflow-hidden rounded-3xl ${
                    item.paymentStatus === "COMPLETE"
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                }`}
            >
                <View
                    className={`absolute inset-0 opacity-10 ${
                        item.paymentStatus === "COMPLETE"
                            ? "bg-green-500"
                            : "bg-red-500"
                    }`}
                />

                <View className="flex flex-row justify-between items-center p-5">
                    <View className="flex-1 pr-4">
                        <Text className="text-xl font-outfitBold text-gray-800 mb-1">
                            {item.eventName}
                        </Text>
                        <Text className="text-sm font-outfitRegular text-gray-600">
                            {formatedDate(item.startDate)}
                        </Text>
                    </View>

                    <View
                        className={`p-3 rounded-full ${
                            item.paymentStatus === "COMPLETE"
                                ? "bg-green-500/20"
                                : "bg-red-500/20"
                        }`}
                    >
                        <AntDesignIcons
                            name="right"
                            size={24}
                            color={item.paymentStatus === "COMPLETE" ? "#00AA55" : "red"}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content"/>

            <View className="px-6 pt-4 pb-6">
                <View className="flex-row justify-between items-center">
                    <View>
                        <Text className="text-4xl font-outfitBold text-gray-800">
                            Transactions
                        </Text>
                        <Text className="text-base font-outfitRegular text-gray-500 mt-1">
                            Your history transaction
                        </Text>
                    </View>
                </View>
            </View>

            <View className="px-6 mb-4">
                <View className="flex-row justify-between bg-gray-100 rounded-full p-1">
                    {["All", "Approved", "Failed"].map((item) => (
                        <TouchableOpacity
                            key={item}
                            onPress={() => setSelected(item)}
                            className={`flex-1 items-center py-3 rounded-full ${
                                selected === item
                                    ? "bg-[#00AA55]"
                                    : "bg-transparent"
                            }`}
                        >
                            <Text
                                className={`font-outfitBold ${
                                    selected === item
                                        ? "text-white"
                                        : "text-gray-600"
                                }`}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <FlatList
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center px-6 mt-20">
                        <View
                            className="w-32 h-32 rounded-full bg-gray-100 
                            items-center justify-center mb-6"
                        >
                            <AntDesignIcons
                                name="inbox"
                                size={64}
                                color="#00AA55"
                            />
                        </View>
                        <Text className="text-2xl font-outfitBold text-gray-800 mb-2 text-center">
                            No Transactions
                        </Text>
                        <Text className="text-base font-outfitRegular text-gray-500 text-center">
                            Your recent transactions will appear here when you make a purchase
                        </Text>
                    </View>
                )}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            />
        </SafeAreaView>
    );
};

export default OrderHistoryUser;