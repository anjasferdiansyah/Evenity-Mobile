import {FlatList, RefreshControl, ScrollView, Text, TouchableOpacity, useWindowDimensions, View,} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {historyEventCustomer, setSelectedHistoryEvent,} from "@/redux/slices/historyEvent";
import {useSharedValue, withTiming,} from "react-native-reanimated";
import moment from "moment";
import {SafeAreaView} from "react-native-safe-area-context";
import {ROUTES} from "@/constant/ROUTES";
import BottomPadding from "@/components/misc/BottomPadding";

export default function CheckApprove() {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.auth);
    const {historyEvent} = useSelector((state) => state.historyEvent);
    const {width} = useWindowDimensions();
    const [selected, setSelected] = useState("All");

    const slideAnim = useSharedValue(0);
    const paddingHorizontal = 20;
    const itemWidth = width / 4.6;

    // Add state for refresh
    const [refreshing, setRefreshing] = useState(false);
    // Create onRefresh callback
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // Dispatch the action to fetch history events
        dispatch(historyEventCustomer(id)).then(() => {
            setRefreshing(false);
        }).catch(() => {
            setRefreshing(false);
        });
    }, [dispatch, id]);

    const handlePress = (item, index) => {
        setSelected(item);
        console.log("selected", selected);
        slideAnim.value = withTiming(index * itemWidth, {duration: 300});
    };

    const filterMapping = {
        All: historyEvent,
        Accepted: historyEvent.filter(
            (item) =>
                item.eventDetailResponseList &&
                item.eventDetailResponseList.every(
                    (detail) => detail.approvalStatus === "APPROVED"
                )
        ),
        Rejected: historyEvent.filter(
            (item) =>
                item.eventDetailResponseList &&
                item.eventDetailResponseList.every(
                    (detail) => detail.approvalStatus === "REJECTED"
                )
        ),
        Pending: historyEvent.filter(
            (item) =>
                item.eventDetailResponseList &&
                item.eventDetailResponseList.some(
                    (detail) => detail.approvalStatus === "PENDING"
                )
        ),
        Cancelled: historyEvent.filter(
            (item) => item.isCancelled
        ),
    };

    const filteredItems = filterMapping[selected] || historyEvent;
    //   console.log("filteredItems", filteredItems);

    const checkApprovalStatus = (event) => {
        const allApproved = event?.eventDetailResponseList?.every(
            (detail) => detail.approvalStatus === "APPROVED"
        );
        const allRejected = event?.eventDetailResponseList?.every(
            (detail) => detail.approvalStatus === "REJECTED"
        );
        const hasApproved = event?.eventDetailResponseList?.some(
            (detail) => detail.approvalStatus === "APPROVED"
        );
        const hasRejected = event?.eventDetailResponseList?.some(
            (detail) => detail.approvalStatus === "REJECTED"
        );
        const hasPending = event?.eventDetailResponseList?.some(
            (detail) => detail.approvalStatus === "PENDING"
        );
        const hasCancelled = event?.isCancelled

        if (allApproved) return "Accepted";
        if (allRejected) return "Rejected";
        if (hasPending) return "Pending";
        if (hasApproved && hasRejected) return "Pending";
        if (hasCancelled) return "Cancelled";
        return "Unknown";
    };

    const formatedDate = (date) => {
        return moment(date).format("DD MMM YYYY");
    };

    const handleSelectedDetail = (item) => {
        dispatch(setSelectedHistoryEvent(item));
        router.push(ROUTES.DASHBOARD.EVENT.DETAIL);
    };

    const getCityName = (city) => {
        return city.replace(/^(KABUPATEN|KOTA)\s+/i, "");
    };

    const renderItem = ({item}) => {
        const eventStatus = checkApprovalStatus(item);

        return (
            <TouchableOpacity
                onPress={() => handleSelectedDetail(item)}
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
                        eventStatus === "Accepted"
                            ? "bg-[#DFF7E6]"
                            : eventStatus === "Rejected"
                                ? "bg-[#FDE4E1]"
                                : "bg-[#FFF7E6]"
                    } rounded-xl`}
                >
                    <View>
                        <Text className="text-xl font-outfitBold text-gray-800">
                            {item.name}
                        </Text>
                        <Text className="text-sm font-outfitRegular text-gray-500">
                            {getCityName(item.city)}, {item.province}
                        </Text>
                        <Text className="text-sm font-outfitRegular text-gray-500">
                            {formatedDate(item.startDate)} - {formatedDate(item.endDate)}
                        </Text>
                    </View>
                    <View className="p-3 bg-white rounded-full">
                        <AntDesignIcons
                            name="right"
                            size={24}
                            color={
                                eventStatus === "Accepted"
                                    ? "#00AA55"
                                    : eventStatus === "Rejected"
                                        ? "red"
                                        : "#FF9900"
                            }
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        dispatch(historyEventCustomer(id));
    }, [dispatch, id]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <View className="w-full h-full px-6">
                <View className="flex flex-col items-center mb-6">
                    <View className="bg-[#00AA55] px-6 py-3 rounded-b-[30px] w-full items-center">
                        <Text className="text-4xl font-outfitBold text-white mb-1">
                            Event
                        </Text>
                        <Text className="text-xl font-outfitRegular text-white">
                            History
                        </Text>
                    </View>
                </View>

                <View className="mb-4">
                    <ScrollView 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{alignItems: 'center'}}
                    className="flex flex-row bg-gray-200 rounded-full p-1">
                        {["All", "Accepted", "Pending", "Rejected", "Cancelled"].map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handlePress(item)}
                                className={`rounded-full mx-auto`}
                                style={{
                                    width: itemWidth, // Set lebar item
                                    paddingVertical: 10, // Padding vertikal
                                    backgroundColor: selected === item ? "#00AA55" : "transparent",

                                }}
                            >
                                <Text
                                    className={`font-outfitBold text-base ${
                                        selected === item
                                            ? "text-white"
                                            : "text-gray-600"
                                    }`}
                                    style={{textAlign: 'center'}} // Center text
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View className="list-history space-y-4 flex-1">
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            item !== undefined && item.id !== undefined
                                ? item.id.toString() + index.toString()
                                : index.toString()
                        }
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#00AA55']}
                                tintColor="#00AA55"
                            />
                        }
                        contentContainerStyle={{paddingBottom: 100}}
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
                                    No Event Available
                                </Text>
                                <Text className="text-base font-outfitRegular text-gray-500 text-center">
                                    It seems there are no upcoming events at the moment. Please check back later!
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </View>
            <BottomPadding/>
        </SafeAreaView>
    );
}
