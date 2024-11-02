import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import tailwind from 'twrnc'
import {router} from "expo-router";
const WithdrawHistoryScreen = () => {
    return (
        <View className='flex-1 justify-center items-center'>
            <View className='w-full h-full pt-20 px-10'>
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-[#00F279] rounded-full self-start">
                    <AntDesignIcons name='arrowleft' size={20} color={'white'} />
                </TouchableOpacity>
                <View className="mt-10">
                    <Text className="text-3xl font-outfitBold text-center mb-8">Withdraw History</Text>
                </View>
                <View className="h-[60%] w-full overflow-visible">
                    <ScrollView className=''>
                        <View  className="p-5 bg-[#00F279] rounded-2xl mb-4" style={[tailwind`shadow-2xl`]}>
                            <Text className="text-xl font-outfitSemiBold text-white">20 Januari 2024</Text>
                            <Text className="text-3xl font-outfitBold text-white">Rp. 2.000.000</Text>
                            <Text className="text-xl font-outfitSemiBold text-white">Approved</Text>
                            <Text className="text-xl font-outfitSemiBold text-white py-2">BCA - 200412412</Text>
                        </View>
                        <View  className="p-5 bg-[#00F279] rounded-2xl mb-4" style={[tailwind`shadow-2xl`]}>
                            <Text className="text-xl font-outfitSemiBold text-white">20 Januari 2024</Text>
                            <Text className="text-3xl font-outfitBold text-white">Rp. 2.000.000</Text>
                            <Text className="text-xl font-outfitSemiBold text-white">Approved</Text>
                            <Text className="text-xl font-outfitSemiBold text-white py-2">BCA - 200412412</Text>
                        </View>
                        <View  className="p-5 bg-[#00F279] rounded-2xl mb-4" style={[tailwind`shadow-2xl`]}>
                            <Text className="text-xl font-outfitSemiBold text-white">20 Januari 2024</Text>
                            <Text className="text-3xl font-outfitBold text-white">Rp. 2.000.000</Text>
                            <Text className="text-xl font-outfitSemiBold text-white">Approved</Text>
                            <Text className="text-xl font-outfitSemiBold text-white py-2">BCA - 200412412</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default WithdrawHistoryScreen