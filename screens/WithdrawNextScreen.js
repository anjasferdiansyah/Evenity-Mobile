import { View, Text } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const WithdrawNextScreen = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
        <View className="w-full h-full pt-20 px-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 bg-[#00F279] rounded-full self-start">
            <AntDesignIcons name='arrowleft' size={20} color={'white'} />
        </TouchableOpacity>
        <View className="mt-14">
            <Text className="text-3xl font-outfitBold text-center">Withdraw</Text>
            <View className="flex flex-col gap-2">
                <Text className="text-xl font-outfitRegular text-gray-500 mt-12">Bank</Text>
                <View className="py-2 px-4 rounded-xl text-xl font-outfitRegular border-[0.5px] border-gray-400">
                    <RNPickerSelect onValueChange={value => console.log(value)} useNativeAndroidPickerStyle={false} items={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}/>
                </View>
            </View>
            <View className="flex flex-col gap-2">
                <Text className="text-xl font-outfitRegular text-gray-500 mt-12">Card Number</Text>
                <TextInput className="py-2 px-4 rounded-xl text-xl font-outfitRegular border-[0.5px] border-gray-400" placeholder='Enter card number'/>
            </View>
        
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Withdraw')} className="bg-[#00F279] self-end w-[30%] mt-12 items-center px-8 py-3 rounded-full">
                <Text className="text-white text-xl font-bold">Next</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default WithdrawNextScreen