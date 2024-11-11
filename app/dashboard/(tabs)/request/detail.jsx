import {SafeAreaView, ScrollView, Text, TouchableOpacity, View, RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {approveRequest, rejectRequest, fetchRequestDetail} from "@/redux/slices/requestSlice";
import BottomPadding from "@/components/misc/BottomPadding";


export default function DetailRequest() {
    const {selectedRequest} = useSelector(state => state.request)
    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = useState(false);


    const onRefresh = () => {

        setRefreshing(true);

        dispatch(fetchRequestDetail(selectedRequest?.eventDetailId))
        .finally(() => setRefreshing(false));
    };

    const formatedDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    function handleApprove(id) {
        return () => {
            dispatch(approveRequest(id))
            alert("Request approved")
        }
    }

    function handleReject(id) {
        return () => {
            dispatch(rejectRequest(id))
            alert("Request rejected")
        }
    }

    const formatNumberWithCommas = (number) => {
        if (!number) return '';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const renderDetailItem = (label, value, isStatus = false) => (

        <View className="py-4 border-b border-[#E5E7EB]">
            <Text className="text-base font-outfitRegular text-[#6B7280] mb-2">
                {label}
            </Text>
            {isStatus ? (
                <View className={`self-start px-3 py-1 rounded-full ${getStatusBadgeStyle(value)}`}>
                    <Text className="text-sm font-outfitSemiBold">{value}</Text>
                </View>
            ) : (
                <Text className="text-lg font-outfitSemiBold text-[#1F2937]">
                    {value || '-'}
                </Text>
            )}
        </View>
    )

    //     useEffect(() => {
    //     console.log("selectedRequest", selectedRequest);
    // }, [selectedRequest]);

    const getStatusBadgeStyle = (status) => {
        switch (status) {
        case 'PENDING':
            return 'bg-yellow-100 text-yellow-800';
        case 'APPROVED':
            return 'bg-green-100 text-green-800';
        case 'REJECTED':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#F9FAFB]">
            <View className="flex-1 px-6 pt-6">
                {/* Header */}
                <View className="flex-row items-center mb-6 mt-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-4 p-2 rounded-full bg-[#F3F4F6]"
                    >
                        <AntDesignIcons name='arrowleft' size={20} color={'#374151'}/>
                    </TouchableOpacity>
                    <Text className="text-2xl font-outfitBold text-[#111827]">
                        Detail Request
                    </Text>
                </View>

                {/* Content */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                    refreshControl={

                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#10B981"]} />

                    }
                >
                    <View className="bg-white rounded-2xl p-6 shadow-md mb-6"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                    >
                        {renderDetailItem('Date Event', formatedDate(selectedRequest?.eventDate))}
                        {renderDetailItem('Unit', `${selectedRequest?.quantity} ${selectedRequest?.unit}`)}
                        {renderDetailItem('Product Name', selectedRequest?.productName)}
                        {renderDetailItem('Event Name', selectedRequest?.eventName)}
                        {renderDetailItem('Approval Status', selectedRequest?.approvalStatus, true)}
                        {renderDetailItem('Notes', selectedRequest?.notes)}
                        {renderDetailItem('Cost', `Rp ${formatNumberWithCommas(selectedRequest?.cost)}`)}
                    </View>
                </ScrollView>

                {/* Action Buttons */}
                {selectedRequest?.approvalStatus === "PENDING" && (
                    <View className="flex-row justify-between absolute bottom-[100px] left-6 right-6">
                        <TouchableOpacity 
                            className="flex-1 mr-4 py-4 bg-[#10B981] items-center rounded-xl"
                            onPress={handleApprove(selectedRequest?.eventDetailId)}
                        >
                            <Text className="text-white text-xl font-outfitBold">Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="flex-1 py-4 bg-[#EF4444] items-center rounded-xl"
                            onPress={handleReject(selectedRequest?.eventDetailId)}
                        >
                            <Text className="text-white text-xl font-outfitBold">Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            <BottomPadding/>
        </SafeAreaView>
    )
}