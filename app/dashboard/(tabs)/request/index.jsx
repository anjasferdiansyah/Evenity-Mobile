import {FlatList, Text, TouchableOpacity, useWindowDimensions, View, StatusBar, RefreshControl} from 'react-native'
import React, {useCallback, useEffect, useState} from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import {fetchRequestLists, setSelectedRequest} from '@/redux/slices/requestSlice';
import moment from 'moment';
import Animated, {
    useAnimatedStyle, 
    useSharedValue, 
    withTiming, 
    FadeInDown, 
    FadeInUp
} from 'react-native-reanimated';
import {ROUTES} from "@/constant/ROUTES";

// Color Palette
const COLORS = {
    primary: '#00AA55',
    background: '#F5F5F5',
    white: '#FFFFFF',
    text: {
        dark: '#2C3E50',
        light: '#7F8C8D'
    },
    status: {
        approved: '#00AA55',
        pending: '#FFC107',
        rejected: '#FF5722'
    }
};

export default function ListRequestScreen() {
    const dispatch = useDispatch();
    const {requestList} = useSelector((state) => state.request);
    const {id} = useSelector((state) => state.auth);
    const {width} = useWindowDimensions();

    const [selected, setSelected] = useState("All");
    const [filteredItems, setFilteredItems] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

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
        getRequestList();
    }, []);

    const getRequestList = useCallback(() => {
        dispatch(fetchRequestLists(id));
    }, [dispatch, id]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getRequestList();
        setTimeout(() => setRefreshing(false), 2000);
    }, [getRequestList]);

    useEffect(() => {
        setFilteredItems(requestList);
    }, [requestList]);

    const formatDate = useCallback((date) => {
        return moment(date).format('DD/MM/YYYY')
    }, []);

    const getStatusColor = useCallback((status) => {
        switch(status) {
            case 'APPROVED': return COLORS.status.approved;
            case 'PENDING': return COLORS.status.pending;
            case 'REJECTED': return COLORS.status.rejected;
            default: return COLORS.text.light;
        }
    }, []);

    const handleSelectedItem = useCallback((item) => {
        dispatch(setSelectedRequest(item));
        router.push(ROUTES.DASHBOARD.REQUEST.DETAIL);
    }, [dispatch]);

    const renderItem = useCallback(({item}) => {
        const statusColor = getStatusColor(item.approvalStatus);
        
        return (
            <Animated.View entering={FadeInDown}>
                <TouchableOpacity
                    onPress={() => handleSelectedItem(item)}
                    key={item.eventDetailId}
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
                        className="flex flex-row justify-between items-center p-5 rounded-2xl"
                        style={{
                            backgroundColor: statusColor + '20', // 20 for opacity
                            borderLeftWidth: 5,
                            borderLeftColor: statusColor
                        }}
                    >
                        <View className="flex-1 pr-4">
                            <Text className="text-md font-outfitSemiBold" style={{color: statusColor}}>
                                {formatDate(item.date)}
                            </Text>
                            <Text className="text-xl font-outfitBold text-[#2C3E50]">
                                {item.eventName}
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
                                color={statusColor}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    }, [formatDate, handleSelectedItem, getStatusColor]);

    return (
        <View className="flex-1 pb-[75r%]" style={{backgroundColor: COLORS.background}}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
            
            <Animated.View 
                entering={FadeInUp}
                className="w-full h-full pt-14 px-6"
            >
                {/* Header */}
                <Animated.View 
                    entering={FadeInUp}
                    className="w-full pt-6 px-6"
                >
                    <Animated.View 
                        entering={FadeInUp} 
                        className="items-center mb-6"
                    >
                        <View className="mb-4 items-center">
                            <Text 
                                className="text-lg font-outfitRegular text-gray-500 mb-1"
                            >
                                Your
                            </Text>
                            <Text 
                                className="text-4xl font-outfitBold text-[#2C3E50] tracking-tight"
                            >
                                REQUESTS
                            </Text>
                            <View 
                                className="h-[2px] w-16 mt-2 self-center" 
                                style={{ backgroundColor: COLORS.primary }}
                            />
                        </View>
                    </Animated.View>
                </Animated.View>

                {/* Segment Control */}
                <View>
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
                        {["All", "Pending", "Approved", "Rejected"].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handlePress(item, index)}
                                className={`rounded-full mx-auto`}
                                style={{
                                    width: itemWidth,
                                    paddingVertical: 10,
                                    // backgroundColor:selected === item ? "#00AA55" : "transparent",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                    }}
                                    className={`font-outfitBold text-base 
                                                  
                                                `}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        {/* <Animated.View
                            style={[
                                animatedIndicatorStyle,
                                {
                                    position: "absolute",
                                    bottom: -2,
                                    left:
                                        selected === "All"
                                            ? 60
                                            : selected === "Approved"
                                                ? itemWidth - 109 :
                                                selected === "Pending" ?
                                                    itemWidth - 60 
                                                : itemWidth - 120,
                                    width: itemWidth - 30,
                                    height: 3,
                                    backgroundColor: COLORS.primary,
                                    borderRadius: 2,
                                },
                            ]}
                        /> */}
                    </View>
                </View>

                {/* Request List */}
                <View className="list-history space-y-4 mt-6">
                    <FlatList
                        data={filteredItems}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.eventDetailId.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                colors={['#00F279']}
                                tintColor="#00F279"
                            />
                        }
                        ListEmptyComponent={() => (
                            <View className="flex-1 items-center justify-center mt-10">
                                <Text className="text-gray-500 text-lg font-outfitRegular">
                                    No products available
                                </Text>
                            </View>
                        )}
                    />
                </View>
            </Animated.View>
        </View>
    )
}