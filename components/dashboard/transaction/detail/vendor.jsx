import {ScrollView, Text, TouchableOpacity, View, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { getEventOnVendor } from '@/redux/slices/orderHistoryVendor';
import moment from 'moment';

const OrderDetailVendor = () => {
    const { selectedOrderHistoryVendor, eventOnVendor } = useSelector((state) => state.orderHistoryVendor);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getEventOnVendor(selectedOrderHistoryVendor?.eventId))
    }, [dispatch, selectedOrderHistoryVendor?.eventId])

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    const calculateDays = (startDate, endDate) => {
        return moment(endDate).diff(moment(startDate), 'days') + 1
    }

    const renderDetailItem = (label, value, isHighlighted = false) => (
        <View className="py-4 border-b border-[#E5E7EB]">
            <Text className="text-base font-outfitRegular text-[#6B7280] mb-2">
                {label}
            </Text>
            <Text className={`text-lg ${isHighlighted ? 'font-outfitSemiBold text-[#2563EB]' : 'font-outfitSemiBold text-[#1F2937]'}`}>
                {value || '-'}
            </Text>
        </View>
    )

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
                    <Text className="text-2xl font-outfitSemiBold text-[#111827]">
                        Detail Order
                    </Text>
                </View>

                {/* Content */}
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    className="flex-1"
                >
                    <View 
                        className="bg-white rounded-2xl p-6 shadow-md mb-6"
                        style={{
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2
                        }}
                    >
                        {renderDetailItem('Event Period', `${formatDate(eventOnVendor?.startDate)} - ${formatDate(eventOnVendor?.endDate)}`)}
                        
                        {renderDetailItem('Days', `${calculateDays(eventOnVendor?.startDate, eventOnVendor?.endDate)} Days`, true)}
                        
                        {renderDetailItem('Quantity', `${selectedOrderHistoryVendor?.quantity} ${selectedOrderHistoryVendor?.unit}`)}
                        
                        {renderDetailItem('Product Name', 'Catering')}
                        
                        {renderDetailItem('Event Name', eventOnVendor?.name)}
                        
                        {renderDetailItem('Address', eventOnVendor?.address)}
                        
                        {renderDetailItem('Notes', selectedOrderHistoryVendor?.notes)}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OrderDetailVendor