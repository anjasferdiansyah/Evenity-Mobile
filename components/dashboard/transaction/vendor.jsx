import {FlatList, Text, TouchableOpacity, useWindowDimensions, View, StatusBar, RefreshControl, ScrollView, ActivityIndicator} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
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
import { getUserBalance } from "@/redux/slices/withdrawHistorySlice";
import BottomPadding from "@/components/misc/BottomPadding";

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
    const {orderHistoryVendor, status} = useSelector(
        (state) => state.orderHistoryVendor
    );



    const {id, user} = useSelector((state) => state.auth);

    const userId = user?.detail?.userId

    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchHistoryTransactionVendor();
    }, []);

    const fetchHistoryTransactionVendor = useCallback(() => {
        dispatch(loadOrderHistoryVendor(id));
        dispatch(getUserBalance({ id: userId }))
    }, [dispatch, id, userId]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchHistoryTransactionVendor();
        
        setTimeout(() => setRefreshing(false), 2000);
    }, [fetchHistoryTransactionVendor]);

    const { userBalance } = useSelector((state) => state.withdrawHistory);

    useEffect(() => {
        dispatch(getUserBalance({ id: userId }));
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
            : orderHistoryVendor.filter((item) => item.eventProgress === selected.toUpperCase());

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
                        item.eventProgress === "FINISHED" 
                            ? "bg-[#DFF7E6]"
                            : item.eventProgress === "ON_PROGRESS"
                                ? "bg-[#FFF7E6]" 
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
                            color={item.eventProgress === "ON_PROGRESS" ? COLORS.primary : "red"}
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
                className="w-full h-full pt-20 px-6 pb-80"
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
                            Rp {userBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
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
                <View className="mt-2">
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 10, // Optional: tambahkan padding horizontal
                        }}
                    >
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
                            {["All", "NOT_STARTED","ON_PROGRESS" , "FINISHED"].map((item, index) => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => handlePress(item, index)}
                                    style={{
                                        alignItems: "center",
                                        paddingVertical: 2,
                                        marginHorizontal: 5, // Tambahkan margin antar item
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: selected === item ? "white" : COLORS.text.dark,
                                            fontSize: 16,
                                            backgroundColor: selected === item ? COLORS.primary : "transparent",
                                            paddingHorizontal: 15,
                                            paddingVertical: 5,
                                            borderRadius: 15,
                                        }}
                                        className="font-outfitBold"
                                    >
                                        {item.replace('_', ' ').charAt(0).toUpperCase() + item.replace('_', ' ').slice(1).toLowerCase()}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* Order History List */}
                <View className="list-history space-y-4 mt-6">
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#00F279']}
                                tintColor="#00F279"
                            />
                        }
                        ListEmptyComponent={() => (
                            <View className="flex-1 justify-center items-center">
                                <Text className="text-gray-500 text-lg font-outfitBold">
                                    No Order History
                                </Text>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <>
                                {status === "loading" && (
                                    <ActivityIndicator
                                        size="large"
                                        color="#00F279"
                                        className="mt-4"
                                    />
                                )}
                                <BottomPadding/>
                            </>
                        )}
                    />
                </View>
            </Animated.View>
        </View>
    );
}