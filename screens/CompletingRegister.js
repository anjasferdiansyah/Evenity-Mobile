import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const CompletingRegister = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full h-[70%] px-10">
        <Text className="text-5xl font-outfitBold w-full">Completing Register</Text>
        <View className="flex flex-col gap-4 py-safe-or-12">
        <View className="flex flex-col gap-2">
        <Text>Product Name</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs" placeholder='Enter product name..'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text>Vendor Type</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs" placeholder='Choose vendor type'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text>Price</Text>
        <Text className="text-xs text-gray-500 absolute right-4 top-12">/Unit</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs" placeholder='Enter price'/>
        </View>
        <View className="flex flex-col gap-2">
        <Text>Description</Text>
        <TextInput className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs" placeholder='Enter price'
         multiline
         numberOfLines={5}
        />
        </View>
        <TouchableOpacity className="bg-[#00AA55] mx-auto w-[90%] mt-12 items-center justify-center px-8 py-3 rounded-full">
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
      </View>
    </View>
  )
}

export default CompletingRegister