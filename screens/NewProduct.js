import { View, Text, TextInput, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';

const NewProduct = ({navigation}) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView className="w-full p-10">
        <Text className="text-4xl mt-20 font-outfitBold w-full">Create New Product</Text>
        <View className="flex flex-col gap-4 py-safe-or-12">
        <View className="flex flex-col gap-2">
        <Text className="font-outfitRegular text-gray-500">Product Name</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" placeholder='Enter product name..'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text className="font-outfitRegular text-gray-500">Vendor Type</Text>
        <TouchableOpacity className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" >
        <RNPickerSelect onValueChange={value => console.log(value)} useNativeAndroidPickerStyle={false} items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}/>
        </TouchableOpacity>
       
        </View>
        <View className="flex flex-col gap-2">
        <Text className="font-outfitRegular text-gray-500">Phone Number</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" placeholder='Enter phone number'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text className="font-outfitRegular text-gray-500">Address Region</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" placeholder='Enter product name'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text className="font-outfitRegular text-gray-500">Address Detail</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" placeholder='Enter address detail'
        />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("NewProduct")} className="bg-[#00AA55] mx-auto w-[90%] mt-5 items-center justify-center px-8 py-3 rounded-full">
          <Text className="text-white text-xl font-bold">Register</Text>
        </TouchableOpacity>
        <Text className="text-center text-gray-500 text-sm mt-4">
          Have an account?{" "}
          <Text
            className="text-blue-500"
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default NewProduct