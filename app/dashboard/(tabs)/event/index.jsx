import {FlatList, ScrollView, Text, TouchableOpacity, useWindowDimensions, View,} from "react-native";
import React, {useEffect, useState} from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import {historyEventCustomer, setSelectedHistoryEvent,} from "@/redux/slices/historyEvent";
import {useSharedValue, withTiming,} from "react-native-reanimated";
import moment from "moment";
import {SafeAreaView} from "react-native-safe-area-context";
import {ROUTES} from "@/constant/ROUTES";

export default function CheckApprove() {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.auth);
    const {historyEvent} = useSelector((state) => state.historyEvent);
    const {width} = useWindowDimensions();
    const [selected, setSelected] = useState("All");

    const slideAnim = useSharedValue(0);
    const paddingHorizontal = 20;
    const itemWidth = (width - paddingHorizontal * 2) / 3;

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
    };

    const filteredItems = filterMapping[selected] || historyEvent;
    //   console.log("filteredItems", filteredItems);

    const checkApprovalStatus = (eventDetails) => {
        const allApproved = eventDetails?.every(
            (detail) => detail.approvalStatus === "APPROVED"
        );
        const allRejected = eventDetails?.every(
            (detail) => detail.approvalStatus === "REJECTED"
        );
        const hasApproved = eventDetails?.some(
            (detail) => detail.approvalStatus === "APPROVED"
        );
        const hasRejected = eventDetails?.some(
            (detail) => detail.approvalStatus === "REJECTED"
        );
        const hasPending = eventDetails?.some(
            (detail) => detail.approvalStatus === "PENDING"
        );

        if (allApproved) return "Accepted";
        if (allRejected) return "Rejected";
        if (hasPending) return "Pending";
        if (hasApproved && hasRejected) return "Pending";
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
        const eventStatus = checkApprovalStatus(item.eventDetailResponseList);

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
                <View className="flex flex-col items-center">
                    <Text className="text-3xl font-outfitBold text-center text-gray-800 mb-1">
                        List
                    </Text>
                    <View className="flex flex-col items-center">
                        <Text className="text-5xl font-outfitBold text-center text-[#00AA55]">
                            Events
                        </Text>
                        {/* <View className="h-1 bg-[#00AA55] w-24 rounded-full mt-1" /> */}
                    </View>
                </View>

                <View className="mt-6">
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{paddingHorizontal: 10}}
                    >
                        <View className="flex flex-row justify-around bg-gray-100 p-4 rounded-full">
                            {["All", "Accepted", "Pending", "Rejected"].map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    onPress={() => handlePress(item)}
                                    style={{
                                        alignItems: "center",
                                        paddingVertical: 2,
                                        marginRight: 10,
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
                        </View>
                    </ScrollView>
                </View>

                <View className="list-history space-y-4 mt-6">
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item, index) =>
                            item !== undefined && item.id !== undefined
                                ? item.id.toString() + index.toString()
                                : index.toString()
                        }
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
