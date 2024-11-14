import {ScrollView, Text, TouchableOpacity, View, SafeAreaView, RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";
import { useDispatch, useSelector } from 'react-redux';
import { getEventOnVendor, loadOrderHistoryDetailVendor, setSelectedInvoiceVendor } from '@/redux/slices/orderHistoryVendor';
import moment from 'moment';

const OrderDetailVendor = () => {
    const { selectedOrderHistoryVendor, eventOnVendor, selectedInvoiceVendor, invoiceByVendorId } = useSelector((state) => state.orderHistoryVendor);
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(loadOrderHistoryDetailVendor(selectedOrderHistoryVendor?.eventId))
        // dispatch(    getEventOnVendor(selectedOrderHistoryVendor?.eventId))
            .finally(() => setRefreshing(false));
    };

    useEffect(()=> {
        // dispatch(getEventOnVendor(selectedOrderHistoryVendor?.eventId))
    }, [dispatch, selectedOrderHistoryVendor?.eventId])

    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    const calculateDays = (startDate, endDate) => {
        return moment(endDate).diff(moment(startDate), 'days') + 1
    }

    const totalCost = selectedInvoiceVendor?.invoiceDetailResponseList?.reduce(
        (acc, item) => acc + (item.cost || 0),
        0
    );

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
            <View className="flex-1 px-6 pt-6 py-28">
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#2563EB']}
                        />
                    }
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
                                                {renderDetailItem('Invoice ID', selectedInvoiceVendor?.invoiceId)}
                        {renderDetailItem('Event Name', selectedInvoiceVendor?.eventName)}
                        {renderDetailItem('Event Period', `${formatDate(selectedInvoiceVendor?.startDate)} - ${formatDate(selectedInvoiceVendor?.endDate)}`)}
                        {renderDetailItem('Customer Name', selectedInvoiceVendor?.customerName)}
                        {renderDetailItem('Days', `${calculateDays(selectedInvoiceVendor?.startDate, selectedInvoiceVendor?.endDate)} Days`, true)}
                        {renderDetailItem('Location', `${selectedInvoiceVendor?.district}, ${selectedInvoiceVendor?.city}, ${selectedInvoiceVendor?.province}`)}
                        {renderDetailItem('Address Detail', selectedInvoiceVendor?.address)}
                        {renderDetailItem('participant', `${selectedInvoiceVendor?.participant}`)}
                        {renderDetailItem('Total Cost', `Rp ${totalCost?.toLocaleString('id-ID')}`)}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default OrderDetailVendor