import {FlatList, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import {fetchRequestLists, setSelectedRequest} from '@/redux/slices/requestSlice';
import moment from 'moment';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {ROUTES} from "@/constant/ROUTES";

export default function ListRequestScreen() {
    const dispatch = useDispatch();
    const {requestList} = useSelector((state) => state.request);
    const {id} = useSelector((state) => state.auth);
    const {width} = useWindowDimensions();

    const [selected, setSelected] = useState("All");
    const [filteredItems, setFilteredItems] = useState([]);

    const slideAnim = useSharedValue(0);
    const paddingHorizontal = 20;
    const itemWidth = (width - paddingHorizontal * 2) / 3;

    const handlePress = useCallback((item, index) => {
        item = item.toUpperCase()
        setSelected(item);
        setFilteredItems(
            item === "ALL"
                ? requestList
                : requestList.filter((request) => request.approvalStatus === item)
        );
        slideAnim.value = withTiming(index * itemWidth, {duration: 300});
    }, [requestList, slideAnim, itemWidth]);

    const animatedIndicatorStyle = useAnimatedStyle(() => ({
        transform: [{translateX: slideAnim.value}],
    }));

    useEffect(() => {
        dispatch(fetchRequestLists(id));
    }, [dispatch, id]);

    useEffect(() => {
        setFilteredItems(requestList);
    }, [requestList]);

    const formatDate = useCallback((date) => {
        return moment(date).format('DD/MM/YYYY')
    }, []);

    const handleSelectedItem = useCallback((item) => {
        dispatch(setSelectedRequest(item));
        router.push(ROUTES.DASHBOARD.REQUEST.DETAIL);
    }, [dispatch]);

    const renderItem = useCallback(({item}) => (
        <TouchableOpacity
            onPress={() => handleSelectedItem(item)}
            key={item.eventDetailId}
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
                    item.approvalStatus === "APPROVED" ? "bg-[#00AA55]" : "bg-[#FF0000]"
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
                        color={item.approvalStatus === "APPROVED" ? "#00AA55" : "red"}
                    />
                </View>
            </View>
        </TouchableOpacity>
    ), [formatDate, handleSelectedItem]);

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
                    </View>
                </View>

                <View className="mt-6">
                    <View className="flex flex-row justify-around relative bg-gray-100 p-4 rounded-full">
                        {["All", "Pending", "Approved", "Rejected"].map((item, index) => (
                            <TouchableOpacity
                                key={index}
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
                                            : selected === "Accepted"
                                                ? itemWidth - 109
                                                : itemWidth - 120,
                                    width: itemWidth - 30,
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
                        keyExtractor={(item) => item.eventDetailId.toString()}
                    />
                </View>
            </View>
        </View>
    )
}