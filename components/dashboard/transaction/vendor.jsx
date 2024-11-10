import {FlatList, Text, TouchableOpacity, useWindowDimensions, View, StatusBar} from "react-native";
import React, {useEffect, useState} from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import Animated, {
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    FadeInDown, 
    FadeInUp
} from "react-native-reanimated";
import {MaterialIcons} from "@expo/vector-icons";
import axios from "axios";
import {loadOrderHistoryVendor, setSelectedOrderHistoryVendor} from "@/redux/slices/orderHistoryVendor";
import {ROUTES} from "@/constant/ROUTES";

// Color Palette
const COLORS = {
    primary: '#00AA55',
    secondary: '#00F279',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: {
        dark: '#2C3E50',
        light: '#7F8C8D'
    }
};

export function OrderHistoryVendor() {
    const dispatch = useDispatch();
    const {orderHistoryVendor} = useSelector(
        (state) => state.orderHistoryVendor
    );

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
        <Animated.View entering={FadeInDown}>
            <TouchableOpacity
                onPress={() => handleSelectedDetail(item)}
                key={item.id}
                style={{
                    shadowColor: "#000",
                    shadowOpacity: 0.1,
                    shadowOffset: {width: 0, height: 4},
                    shadowRadius: 10,
                    elevation: 5,
                    marginBottom: 15,
                }}
            >
                <View
                    className={`flex flex-row justify-between items-center p-5 ${
                        item.status === "Success" 
                            ? "bg-[#DFF7E6]" 
                            : "bg-[#FDE4E1]"
                    } rounded-2xl`}
                >
                    <View className="flex-1 pr-4">
                        <Text className="text-xl font-outfitBold text-[#2C3E50]">
                            {item.eventName}
                        </Text>
                        <Text className="text-sm font-outfitRegular text-[#7F8C8D]">
                            {item.eventProgress}
                        </Text>
                    </View>

                    <View 
                        className="p-3 bg-white rounded-full"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: {width: 0, height: 2},
                            shadowRadius: 5,
                            elevation: 3,
                        }}
                    >
                        <AntDesignIcons
                            name="right"
                            size={24}
                            color={item.status === "Success" ? COLORS.primary : "red"}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            
            <Animated.View 
                entering={FadeInUp}
                className="w-full h-full pt-20 px-6"
            >
                {/* Balance Section */}
                <View className="pb-10 px-4">
                    <View 
                        className="bg-[#F5F7FA] rounded-3xl p-6"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                        }}
                    >
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-sm font-outfitRegular text-gray-500">
                                Total Balance
                            </Text>
                            <TouchableOpacity 
                                className="bg-[#E6F3EC] px-3 py-1 rounded-full"
                            >
                                {/* <Text className="text-[#00AA55] text-xs font-outfitMedium">
                                    This Month
                                </Text> */}
                            </TouchableOpacity>
                        </View>

                        <Text className="text-4xl font-outfitBold text-[#2C3E50] mb-6">
                            Rp {userBalance.toLocaleString()}
                        </Text>
                        
                        <View className="flex-row space-x-4 gap-2">
                            <TouchableOpacity
                                onPress={() => router.push(ROUTES.DASHBOARD.TRANSACTION.WITHDRAW.INDEX)}
                                className="flex-1 bg-[#00F279] px-6 py-4 rounded-2xl"
                                style={{
                                    shadowColor: "#00F279",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Text className="text-white font-outfitBold text-center">
                                    Withdraw
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push(ROUTES.DASHBOARD.TRANSACTION.WITHDRAW.HISTORY)}
                                className="flex-1 bg-[#2C3E50] px-6 py-4 rounded-2xl"
                                style={{
                                    shadowColor: "#2C3E50",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 4,
                                    elevation: 3,
                                }}
                            >
                                <Text className="text-white font-outfitBold text-center">
                                    History
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Segment Control */}
                <View className="mt-6">
                    <View 
                        className="flex flex-row justify-around relative bg-white p-2 rounded-full"
                        style={{
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowOffset: {width: 0, height: 2},
                            shadowRadius: 5,
                            elevation: 3,
                        }}
                    >
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
                                        color: selected === item ? "white" : COLORS.text.dark,
                                        fontWeight: "bold", fontSize: 16,
                                        backgroundColor: selected === item ? COLORS.primary : "transparent",
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
                                    left: selected === "All" ? 25 : selected === "Success" ? itemWidth - 109 : itemWidth - 120,
                                    width: itemWidth - 30,
                                    height: 3,
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 2,
                                },
                            ]}
                        />
                    </View>
                </View>

                {/* Order History List */}
                <View className="list-history space-y-4 mt-6">
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </Animated.View>
        </View>
    );
}