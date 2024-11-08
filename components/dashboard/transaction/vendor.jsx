import {FlatList, Text, TouchableOpacity, useWindowDimensions, View,} from "react-native";
import React, {useEffect, useState} from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Animated, {useAnimatedStyle, useSharedValue, withTiming,} from "react-native-reanimated";
import {MaterialIcons} from "@expo/vector-icons";
import axios from "axios";
import {loadOrderHistoryVendor, setSelectedOrderHistoryVendor} from "@/redux/slices/orderHistoryVendor";
import {ROUTES} from "@/constant/ROUTES";

export function OrderHistoryVendor() {
    const dispatch = useDispatch();
    const {orderHistoryVendor} = useSelector(
        (state) => state.orderHistoryVendor
    );

    console.log("Order History Vendor", orderHistoryVendor)

    const {id, user} = useSelector((state) => state.auth);


    useEffect(() => {
        dispatch(loadOrderHistoryVendor(id));
    }, [dispatch, id]);


    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        const fetchUserBalance = async () => {
            try {
                const response = await axios.get(
                    `transaction/balance/user/${user?.userId}`,
                );
                const {data} = response.data;
                setUserBalance(data.amount);
            } catch (error) {
                console.log("Error fetching user balance:", error);
            }
        };

        fetchUserBalance();
    }, [user]);

    const {width} = useWindowDimensions();

    const [selected, setSelected] = useState("All");

    const slideAnim = useSharedValue(0);
    const paddingHorizontal = 20;
    const itemWidth = (width - paddingHorizontal * 2) / 3;

    const handlePress = (item, index) => {
        setSelected(item);
        slideAnim.value = withTiming(index * itemWidth, {duration: 300});
    };

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [{translateX: slideAnim.value}],
    }));


    const filteredItems =
        selected === "All"
            ? orderHistoryVendor
            : orderHistoryVendor.filter((item) => item.status === selected);


    const handleSelectedDetail = (item) => {
        dispatch(setSelectedOrderHistoryVendor(item))
        router.push(ROUTES.DASHBOARD.TRANSACTION.DETAIL);
    };

    const renderItem = ({item}) => (
        <TouchableOpacity
            onPress={() => handleSelectedDetail(item)}
            key={item.id}
            style={{
                shadowColor: "#000",
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 4,
                elevation: 4,
                padding: 10,
            }}
        >
            <View
                className={`flex flex-row justify-between items-center p-5 ${
                    item.status === "Success" ? "bg-[#DFF7E6]" : "bg-[#FDE4E1]"
                } rounded-xl`}
            >
                <View>
                    <Text className="text-xl font-outfitBold text-gray-800">
                        {item.eventName}
                    </Text>
                    <Text className="text-sm font-outfitRegular text-gray-500">
                        {item.eventProgress}
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
    );

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <View className="border-b border-gray-400 pb-10">
                    <Text className="text-lg font-outfitBold pb-4 text-gray-500 text-center">
                        Your Active balance
                    </Text>
                    <Text className="text-5xl font-outfitBold pb-4 text-center">
                        Rp. {userBalance}
                    </Text>
                    <View className="flex flex-row justify-center gap-4">
                        <TouchableOpacity
                            onPress={() => router.push(ROUTES.DASHBOARD.TRANSACTION.WITHDRAW.INDEX)}
                            className="bg-[#00F279] px-8 py-4 w-[40%] rounded-full flex flex-row items-center justify-center gap-4"
                        >
                            <MaterialIcons name="account-balance-wallet" size={20} color="white"/>
                            <Text className="text-white font-outfitBold text-center">
                                Withdraw
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push(ROUTES.DASHBOARD.TRANSACTION.WITHDRAW.HISTORY)}
                            className="bg-[#00AA55] px-8 py-4 w-[40%] rounded-full"
                        >
                            <Text className="text-white text-center font-outfitBold">
                                History
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mt-6">
                    <View className="flex flex-row justify-around relative bg-gray-100 p-4 rounded-full">
                        {["All", "Success", "Failed"].map((item, index) => (
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
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </View>
        </View>
    );
}
