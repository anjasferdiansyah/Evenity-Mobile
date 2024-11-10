import {ScrollView, Text, TouchableOpacity, View, Dimensions} from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import BottomPadding from "@/components/misc/BottomPadding";
import {regenerateEvent} from "@/redux/slices/historyEvent";
import Animated, {
    FadeInDown, 
    FadeInUp, 
    useAnimatedStyle, 
    useSharedValue, 
    withSpring
} from 'react-native-reanimated';
import { BlurView } from "@react-native-community/blur";

const {width} = Dimensions.get('window');

const InvoiceDetailUser = () => {
    const {selectedHistoryEvent} = useSelector((state) => state.historyEvent);
    const dispatch = useDispatch();

    // Animasi scaling
    const scale = useSharedValue(1);

    const animatedCardStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: withSpring(scale.value) }]
        };
    });

    const formatDate = (date) => {
        return moment(date).format("DD MMM YYYY");
    };

    const getCityName = (city) => {
        return city.replace(/^(KABUPATEN|KOTA)\s+/i, "");
    };

    const totalCost = selectedHistoryEvent?.eventDetailResponseList?.reduce(
        (acc, item) => acc + (item.cost || 0),
        0
    );

    function handleRegenerate(id) {
        return () => {
            console.log("id", id)
            dispatch(regenerateEvent(id));
        }
    }

    const DetailCard = ({title, children, style}) => (
        <Animated.View 
            entering={FadeInDown}
            style={[{
                backgroundColor: 'white', 
                borderRadius: 15, 
                padding: 15, 
                marginBottom: 15, 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 6,
                elevation: 3,
            }, style]}
        >
            <Text className="text-lg font-outfitRegular text-gray-500 mb-2">
                {title}
            </Text>
            {children}
        </Animated.View>
    );

    return (
        <View className="flex-1 bg-[#F5F5F5]">
            {/* Background Overlay */}
            <View 
                className="absolute top-0 left-0 right-0 h-[25%] bg-[#00AA55]"
                style={{
                    borderBottomLeftRadius: 50,
                    borderBottomRightRadius: 50,
                }}
            />

            <View className="flex-1 pt-5 px-5">
                <Animated.View 
                    entering={FadeInUp}
                    className="flex-row items-center mb-4"
                >
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 bg-white/30 rounded-full w-10 h-10 mr-4"
                    >
                        <AntDesignIcons name="arrowleft" size={20} color={"white"}/>
                    </TouchableOpacity>
                    <View className="mt-12 mb-6">
                        <Text className="text-4xl font-outfitBold text-white">
                            Event Details
                        </Text>
                        <Text className="text-base font-outfitRegular text-white">
                            Detailed information about your event
                        </Text>
                    </View>
                </Animated.View>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                >
                    {/* Event Details in Modern Card Style */}
                    <DetailCard title="Event Name">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedHistoryEvent?.name}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Event Description">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedHistoryEvent?.description}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Event Theme">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedHistoryEvent?.theme}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Date Event">
                        <View className="flex flex-row gap-2">
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {formatDate(selectedHistoryEvent?.startDate)}
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                -
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {formatDate(selectedHistoryEvent?.endDate)}
                            </Text>
                        </View>
                    </DetailCard>

                    <DetailCard title="Location">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {getCityName(selectedHistoryEvent?.city)},{" "}
                            {selectedHistoryEvent?.province}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Address">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedHistoryEvent?.address}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Participant">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedHistoryEvent?.participant}
                        </Text>
                    </DetailCard>

                    {/* List of Vendors */}
                    <DetailCard title="List Vendor Choose">
                        {selectedHistoryEvent?.eventDetailResponseList.map((item, index) => (
                            <View
                                key={index}
                                className={`flex flex-row gap-4 w-full items-center mt-2`}
                            >
                                <View
                                    className={`flex flex-col gap-2 p-4 rounded-xl w-full ${
                                        item.approvalStatus === "APPROVED"
                                            ? "bg-[#DFF7E6]"
                                            : item.approvalStatus === "REJECTED"
                                                ? "bg-[#FDE4E1]"
                                                : "bg-[#FFF7E6]"
                                    }`}
                                >
                                    <View>
                                        <Text className="font-outfitSemiBold text-xl">
                                            {item.productName}
                                        </Text>
                                        <Text className="font-outfitRegular text-sm">
                                            {item.approvalStatus}
                                        </Text>
                                    </View>

                                    <Text className="font-outfitRegular text-xl text-right flex-1">
                                        {`Rp ${item.cost
                                            .toString()
                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                                    </Text>
                                </View>
                            </View>
                        ))} 
                    </DetailCard>

                    {/* Total Price */}
                    <DetailCard title="Total Cost">
                        <Text className="text-4xl font-outfitBold text-gray-800">
                            {`Rp ${totalCost
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                        </Text>
                    </DetailCard>

                    {selectedHistoryEvent?.eventDetailResponseList?.some(
                        (item) => item.approvalStatus === "REJECTED"
                    ) && (
                        <TouchableOpacity 
                            className="bg-green-400 p-4 rounded-xl shadow-lg"
                            onPress={handleRegenerate(selectedHistoryEvent?.id)}
                        >
                            <Text className="text-lg font-outfitRegular text-white">
                                Regenerate
                            </Text>
                        </TouchableOpacity>
                    )}
                    <BottomPadding/>
                </ScrollView>
            </View>
        </View>
    );
};

export default InvoiceDetailUser ;