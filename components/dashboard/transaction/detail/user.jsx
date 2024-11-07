import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import tailwind from "twrnc";
import {router} from "expo-router";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const OrderDetailUser = () => {

    const { selectedInvoiceCustomer, ordersUser } = useSelector((state) => state.invoiceCustomer);

    // const isAllApproved = ordersUser.every((item) =>
    //   item.invoiceDetailResponseList.every(
    //     (detail) => detail.approvalStatus === "APPROVED"
    //   )
    // );
    const formatDate = (date) => {
        return moment(date).format('DD MMM YYYY')
    }

    //  const calculateTotalCost = () => {
    //   const totalCost = selectedInvoiceCustomer?.invoiceDetailResponseList.reduce(
    //     (total, item) => total + (item.cost || 0), 0
    //   );
    //   return `Rp ${totalCost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`;
    // };

    const handlePayment  = async () => {

        const invoiceId = selectedInvoiceCustomer?.invoiceId

        console.log("invoiceId", invoiceId)

        try {
            const response = await axios.put(`/invoice/${invoiceId}`)
            if(response.status !== 200) return
            console.log("payment Response", response)
            const midtransUrl = response.data.data.url
            if(midtransUrl){
                router.push({ pathname: '/payment', params: { url: midtransUrl } });
            }
   
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <View className="flex-1  bg-white">
            <View className="h-full pt-10 px-5">
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="p-2 bg-[#00F279] rounded-full w-10 h-10"
                >
                    <AntDesignIcons name="arrowleft" size={20} color={"white"} />
                </TouchableOpacity>
                {/* Header Section */}
                <View className="mt-10 border-b border-gray-300 pb-4 ">
                    <Text className="text-5xl font-outfitBold text-gray-800">
              Detail Order
                    </Text>
                </View>
                {/* Scrollable Content */}
                <View className="h-[55%] mt-5">
                    <ScrollView>
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Invoice ID
                            </Text>
                            <Text className="text-2xl font-outfitSemiBold text-gray-800">
                                {selectedInvoiceCustomer?.invoiceId}
                            </Text>
                        </View>
                        {/* Event Name */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Event Name
                            </Text>
                            <Text className="text-2xl font-outfitSemiBold text-gray-800">
                                {selectedInvoiceCustomer?.eventName}
                            </Text>
                        </View>
                        {/* Event Date */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Date Event
                            </Text>
                            <View className="flex flex-row gap-2">
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
                        </View>
                        {/* Capacity */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Participant
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {selectedInvoiceCustomer?.participant}
                            </Text>
                        </View>
                        {/* Address */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Address
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-gray-800">
                                {selectedInvoiceCustomer?.address}
                            </Text>
                        </View>
                        {/* Status */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Payment Status
                            </Text>
                            <View
                            >
                                <Text className="text-xl font-outfitSemiBold text-gray-800">{selectedInvoiceCustomer?.paymentStatus}</Text>
                            </View>
                        </View>
                        {/* List of Vendors */}
                        <View className="py-2">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  List Vendor Choose
                            </Text>
                            {
                                selectedInvoiceCustomer?.invoiceDetailResponseList.map((item, index) => (
                                    <View
                                        key={index}
                                        className="flex flex-row gap-4 w-full items-center mt-2"
                                    >
                                        <View className="flex flex-row gap-2 bg-slate-200 p-4 rounded-xl w-full">
                                            <View>
                                                <Text className="font-outfitSemiBold text-xl">
                                                    {item.productName}
                                                </Text>
                                                <Text className="font-outfitRegular text-sm">Approval Status by Vendor : {item.approvalStatus}</Text>
                                            </View>
                       
                                            <Text className="font-outfitRegular text-xl text-right flex-1">
                                                {`Rp ${item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                        </View>
                        {/* Total Price */}
                        <View className="py-8">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                  Total Cost
                            </Text>
                            <Text className="text-4xl font-outfitBold text-gray-800">
                                {selectedInvoiceCustomer?.totalCost}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                {/* Action Buttons */}
                { 
                    selectedInvoiceCustomer &&
      selectedInvoiceCustomer?.paymentStatus === "UNPAID" &&
      
      <View className="flex flex-col gap-2 w-full mt-5 items-center">
          <TouchableOpacity className="bg-[#00F279] items-center justify-center px-8 py-3 rounded-full w-full" onPress={handlePayment}>
              <Text className="text-white text-xl font-bold">Pay Now!</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 items-center justify-center px-8 py-3 rounded-full w-full">
              <Text className="text-white text-xl font-bold">Cancel Order</Text>
          </TouchableOpacity>
      </View>}
            </View>
        </View>
    );
};

export default OrderDetailUser;