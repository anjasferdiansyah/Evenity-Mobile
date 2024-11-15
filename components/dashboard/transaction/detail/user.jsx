import {Text, TouchableOpacity, View, ScrollView, Dimensions, RefreshControl} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import {router} from "expo-router";
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import axios, { all } from "axios";
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import BottomPadding from "@/components/misc/BottomPadding";
import { getEventById } from "@/redux/slices/eventSlice";

const {width} = Dimensions.get('window');

const OrderDetailUser = () => {
    const {selectedInvoiceCustomer} = useSelector((state) => state.invoiceCustomer);
    const [refreshing, setRefreshing] = useState(false);
    const {event} = useSelector(state => state.event)
    const dispatch = useDispatch()
    const [allApproved, setAllApproved] = useState(false)

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    const getEventDetailResponse = (id) => {
        dispatch(getEventById(id));
    };

    useEffect(() => {
        if (selectedInvoiceCustomer?.eventId) {
            getEventDetailResponse(selectedInvoiceCustomer?.eventId);
            // console.log("Ke HITT!")
        }
    }, [selectedInvoiceCustomer]);

    // const allApproved = event?.eventDetailResponseList?.every(detail => detail.approvalStatus === 'APPROVED')

  

    useEffect(() => {
    if (event?.eventDetailResponseList) {
        const filteredDetails = event.eventDetailResponseList
        const allApprovedStatus = filteredDetails.length > 0 && filteredDetails.every(detail => detail.approvalStatus === 'APPROVED');
        setAllApproved(allApprovedStatus);
    }
}, [event]);

    const handlePayment = async () => {
        const invoiceId = selectedInvoiceCustomer?.invoiceId
        console.log("invoiceId", invoiceId)

        try {
            const response = await axios.put(`/invoice/${invoiceId}`)
            if (response.status !== 200) return
            console.log("payment Response", response)
            const midtransUrl = response.data.data.url
            if (midtransUrl) {
                router.push({pathname: '/payment', params: {url: midtransUrl}});
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onRefresh = async () => {

        setRefreshing(true);

        try {
            await axios.get(`/invoice/${selectedInvoiceCustomer?.invoiceId}`);
        } catch (error) {

            console.log(error);

        } finally {

            setRefreshing(false);

        }

    };

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

    const handleFinishEvent = async () => {
        
    }

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

            <View className="flex-1 pt-10 px-5 mt-5">
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
                    <View>
                        <Text className="text-4xl font-outfitBold text-white">
                            Order Details
                        </Text>
                        <Text className="text-base font-outfitRegular text-white/80">
                            Detailed information about your order
                        </Text>
                    </View>
                </Animated.View>

                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 50}}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#00AA55']}
                        />
                    }
                >
                    {/* Order Information */}
                    <DetailCard title="Invoice ID">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedInvoiceCustomer?.invoiceId}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Event Name">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedInvoiceCustomer?.eventName}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Date Event">
                        <View className="flex flex-row gap-2 items-center">
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {formatDate(selectedInvoiceCustomer?.startDate)}
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                -
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {formatDate(selectedInvoiceCustomer?.endDate)}
                            </Text>
                        </View>
                    </DetailCard>

                    <DetailCard title="Participants">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedInvoiceCustomer?.participant}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Address">
                        <Text className="text-xl font-outfitSemiBold text-gray-800">
                            {selectedInvoiceCustomer?.address}
                        </Text>
                    </DetailCard>

                    <DetailCard title="Payment Status">
                        <Text 
                            className={`text-xl font-outfitSemiBold ${
                                selectedInvoiceCustomer?.paymentStatus === 'COMPLETE' 
                                ? 'text-green-600' 
                                : 'text-red-600'
                            }`}
                        >
                            {selectedInvoiceCustomer?.paymentStatus}
                        </Text>
                    </DetailCard>

                    {/* Vendor List */}
                    {
                        selectedInvoiceCustomer?.invoiceDetailResponseList.length > 0 && !selectedInvoiceCustomer?.isEventCancelled && (
                            <DetailCard title="Selected Vendors">
                            {selectedInvoiceCustomer?.invoiceDetailResponseList.map((item, index) => (
                                <Animated.View 
                                    key={index} 
                                    entering={FadeInDown.delay(index * 100)}
                                    className={`
                                        flex flex-row gap-4 w-full items-center mt-2 bg-slate-100 p-4 rounded-xl
                                    `}
                                >
                                    <View className="flex-1">
                                        <Text className="text-lg font-outfitSemiBold text-gray-800 mb-1">
                                            {item.productName}
                                        </Text>
                                        {/* <Text 
                                            className={`text-sm font-outfitRegular ${
                                                item.approvalStatus === 'APPROVED' 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                            }`}
                                        >
                                            Approval Status: {item.approvalStatus}
                                        </Text> */}
                                    </View>
                                    <Text className="text-lg font-outfitBold text-gray-800">
                                        {`Rp ${item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                                    </Text>
                                </Animated.View>
                            ))}
                        </DetailCard>
                        )
                    }
                 

                    {/* Total Cost */}
                    {
                        selectedInvoiceCustomer?.paymentStatus === "UNPAID" && selectedInvoiceCustomer?.totalCost > 0 && !selectedInvoiceCustomer?.isEventCancelled && (
                            <DetailCard title="Total Cost">
                                <Text className="text-3xl font-outfitBold text-gray-800">
                                    {`Rp ${(selectedInvoiceCustomer?.totalCost + selectedInvoiceCustomer?.adminFeeResponse?.cost)
                                        .toString()
                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                                </Text>
                                <Text className="text-gray-500 text-sm mt-1">
                                    {`(Termasuk admin fee 3%)`}
                                </Text>
                            </DetailCard>
                        )
                    }


                    {
                        !allApproved && selectedInvoiceCustomer?.paymentStatus === "UNPAID" && (
                            <DetailCard title="Vendor Status">
                            <Text className="text-xl font-outfitBold text-gray-800">
                                { !selectedInvoiceCustomer?.isEventCancelled ? "Waiting for approval" : "Cancelled"  }
                            </Text>
                        </DetailCard>
                        ) 
                    }
                  

                    {/* Action Buttons */}
                    {allApproved  && selectedInvoiceCustomer?.paymentStatus === "UNPAID" &&(
                        <View className="flex-row space-x-4 gap-2">
                            <TouchableOpacity
                                className="flex-1 bg-[#00F279] items-center justify-center py-6 rounded-full"
                                onPress={handlePayment}
                            >
                                <Text className="text-white text-2xl font-outfitBold">
                                    Pay Now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
                    <BottomPadding />
                </ScrollView>
            </View>
        </View>
    );
};

export default OrderDetailUser ;