import { View, Text } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'

const WithdrawScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <View className="w-full h-full pt-20 px-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-[#00F279] rounded-full self-start">
            <AntDesignIcons name='arrowleft' size={20} color={'white'} />
        </TouchableOpacity>
        <View className="mt-14">
            <Text className="text-3xl font-outfitBold text-center">Withdraw</Text>
            <Text className="text-xl font-outfitRegular text-center text-gray-500 mt-12">Joko Susilo</Text>
            <Text className="text-xl font-outfitBold text-center">BCA - 12346598</Text>
            <View className="flex flex-row items-center justify-center border-b-[0.5px]  border-gray-400 px-8">
                <Text className="text-5xl font-outfitBold text-center text-gray-500  mt-12">Rp.</Text>
                <TextInput className="py-2 px-4 rounded-xl text-5xl font-outfitRegular w-[80%] mt-12 " />
            </View>
           <View className="flex flex-row items-center justify-center gap-8">
            <TouchableOpacity className="flex flex-row items-center justify-center bg-[#00F279] py-3 px-8 rounded-full mt-20">
                <Text className="text-xl font-outfitBold text-center text-white">Send</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex flex-row items-center justify-center bg-red-500 py-3 px-8  rounded-full mt-20">
                <Text className="text-xl font-outfitBold text-center text-white">Cancel</Text>
            </TouchableOpacity>
           </View>
        </View>
        </View>
    </View>
  )
}

export default WithdrawScreen