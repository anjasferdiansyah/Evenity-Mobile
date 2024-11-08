import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {approveRequest, rejectRequest} from "@/redux/slices/requestSlice";

export default function DetailRequest() {

    const {selectedRequest} = useSelector(state => state.request)
    const dispatch = useDispatch()

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

    return (
        <View className="flex-1 items-start justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-12 border-b border-gray-300 w-full">
                    <Text className="w-full text-5xl font-outfitBold pb-4">Detail Request</Text>
                </View>
                <View className="h-[55%]">
                    <ScrollView className="">
                        <View className="py-4">
                            <Text className="text-xl font-outfitRegular text-gray-500">
                                Date Event
                            </Text>
                            <Text className="text-xl font-outfitSemiBold">
                                {formatedDate(selectedRequest?.eventDate)}
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-xl font-outfitRegular text-gray-500">
                                {selectedRequest?.unit}
                            </Text>
                            <Text className="text-xl font-outfitSemiBold">
                                {selectedRequest?.quantity}
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Product Name
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                {selectedRequest?.productName}
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Event Name
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                {selectedRequest?.eventName}
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Approval Status
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                {selectedRequest?.approvalStatus}
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Notes
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                {selectedRequest?.notes}
                            </Text>
                        </View>

                    </ScrollView>
                </View>

                <View className="flex flex-row gap-8 w-full mt-3 items-center justify-center">
                    {
                        selectedRequest?.approvalStatus === "PENDING" &&
                        <>
                            <TouchableOpacity className="bg-[#00F279] items-center justify-center px-8 py-3 rounded-full"
                                onPress={handleApprove(selectedRequest?.eventDetailId)}>
                                <Text className="text-white text-xl font-bold">Approve</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-red-500 items-center justify-center px-8 py-3 rounded-full"
                                onPress={handleReject(selectedRequest?.eventDetailId)}>
                                <Text className="text-white text-xl font-bold">Reject</Text>
                            </TouchableOpacity>
                        </>
                      
                    }
                </View>
            </View>
        </View>
    )
}
