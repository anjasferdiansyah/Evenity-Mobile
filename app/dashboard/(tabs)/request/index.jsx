import { View, Text } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import {router} from "expo-router";

const ListRequestScreen = () => {
    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <Text className="text-5xl font-outfitBold text-center">
                    List Requests
                </Text>
                <View className="">
                    <View className="flex flex-row justify-between items-center mt-10 p-6 bg-[#00F279] rounded-full">
                        <View>
                            <Text className="text-3xl font-outfitBold text-center text-white">
                                20/12/2024
                            </Text>
                            <Text className="font-outfitRegular text-center text-white">
                                Malang, Indonesia
                            </Text>
                        </View >
                        <TouchableOpacity onPress={() => router.push(`dashboard/request/detail`)} className="p-4 bg-white rounded-full">
                            <AntDesignIcons name='arrowright' size={30} color={'#00AA55'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    )
}

export default ListRequestScreen