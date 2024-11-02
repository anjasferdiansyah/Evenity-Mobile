import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import {router} from "expo-router";

const OrderDetailVendor = () => {
    return (
        <View className="flex-1 items-start justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
                </TouchableOpacity>
                <View className="mt-12 border-b border-gray-300 w-full">
                    <Text className="w-full text-5xl font-outfitBold pb-4">Detail Order</Text>
                </View>
                <View className="h-[50%]">
                    <ScrollView className="">
                        <View className="py-4">
                            <Text className="text-xl font-outfitRegular text-gray-500">
                                Date Event
                            </Text>
                            <Text className="text-xl font-outfitSemiBold">
                                20 November - 21 November
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-xl font-outfitRegular text-gray-500">
                                Days
                            </Text>
                            <Text className="text-xl font-outfitSemiBold">
                                2
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-xl font-outfitRegular text-gray-500">
                                Quantity (pcs)
                            </Text>
                            <Text className="text-xl font-outfitSemiBold">
                                2
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Product Name
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                Catering
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Event Name
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                Halloween
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Address
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                Jalan Sekartaji 1 No 20 Malang, Jawa Timur
                            </Text>
                        </View>
                        <View className="py-4">
                            <Text className="text-lg font-outfitRegular text-gray-500">
                                Note
                            </Text>
                            <Text className="text-lg font-outfitSemiBold">
                                Harus Pedess Lurrr!
                            </Text>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default OrderDetailVendor