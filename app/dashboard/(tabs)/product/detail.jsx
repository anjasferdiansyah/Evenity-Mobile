import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '@/redux/slices/productSlice'

const ProductDetail = () => {


    const dispatch = useDispatch()


    const {selectedProduct} = useSelector((state) => state.product)


  return (
    <View className="flex-1 items-center justify-center bg-white">
    <View className="w-full px-10">
    <TouchableOpacity onPress={() => router.back()}
                              className="p-2 bg-[#00F279] rounded-full self-start">
                <AntDesignIcons name='arrowleft' size={20} color={'white'}/>
            </TouchableOpacity>
    </View>
   <View className="mt-10 border-b border-gray-300 w-full px-10">
                <Text className="w-full text-5xl font-outfitBold pb-4">Product Detail</Text>
            </View>
            <View className="h-[60%] px-10">
                <ScrollView className="">
                    <View className="py-4">
                        <Text className="text-xl font-outfitRegular text-gray-500">
                            Name
                        </Text>
                        <Text className="text-xl font-outfitSemiBold">
                           {selectedProduct?.name}
                        </Text>
                    </View>
                    <View className="py-4">
                        <Text className="text-xl font-outfitRegular text-gray-500">
                            Description
                        </Text>
                        <Text className="text-xl font-outfitSemiBold">
                            {selectedProduct?.description}
                        </Text>
                    </View>
                    <View className="py-4">
                        <Text className="text-xl font-outfitRegular text-gray-500">
                            Price
                        </Text>
                        <Text className="text-xl font-outfitSemiBold">
                            {selectedProduct?.price}
                        </Text>
                    </View>
                    <View className="py-4">
                        <Text className="text-xl font-outfitRegular text-gray-500">
                            Category
                        </Text>
                        <Text className="text-xl font-outfitSemiBold">
                            {selectedProduct?.categoryName}
                        </Text>
                    </View>
                </ScrollView>
            </View>
</View>
  )
}

export default ProductDetail