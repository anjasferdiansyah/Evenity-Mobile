import { ScrollView, Text, TouchableOpacity, View, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import AntDesignIcons from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct } from '@/redux/slices/productVendorSlice'
import { ROUTES } from '@/constant/ROUTES'

const ProductDetail = () => {
    const { selectedProduct } = useSelector((state) => state.productVendor)

    const dispatch = useDispatch();

    const handleDeleteProduct = async () => {

        Alert.alert(
            "Confirm",
            "Are you sure you want to delete this product?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: async () => {
                        dispatch(deleteProduct(selectedProduct?.id));
                        Alert.alert("Success", "Product deleted successfully.");
                        router.push(ROUTES.DASHBOARD.PRODUCT.INDEX);
                    }
                }
            ]
        )
    }

    console.log("selectedProduct", selectedProduct);

    return (
        <SafeAreaView className="flex-1 bg-[#F5F7FA]">
            <View className="flex-1 px-6 pt-4">
                {/* Header Section */}
                <View className="flex-row items-center justify-between mb-6 mt-10">
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        className="p-3 bg-white rounded-full shadow-md">
                        <AntDesignIcons name='arrowleft' size={24} color='#2C3E50'/>
                    </TouchableOpacity>
                    <Text className="text-3xl font-outfitBold text-[#2C3E50]">
                        Product Details
                    </Text>
                    <View className="w-12"></View>
                </View>

                {/* Product Details Container */}
                <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Name Section */}
                        <View className="mb-5">
                            <Text className="text-base font-outfitRegular text-gray-500 mb-2">
                                Product Name
                            </Text>
                            <Text className="text-2xl font-outfitSemiBold text-[#2C3E50]">
                                {selectedProduct?.name || 'N/A'}
                            </Text>
                        </View>

                        {/* Description Section */}
                        <View className="mb-5 border-t border-gray-200 pt-4">
                            <Text className="text-base font-outfitRegular text-gray-500 mb-2">
                                Description
                            </Text>
                            <Text className="text-xl font-outfitRegular text-[#2C3E50]">
                                {selectedProduct?.description || 'No description available'}
                            </Text>
                        </View>

                        {/* Price Section */}
                        <View className="mb-5 border-t border-gray-200 pt-4">
                            <Text className="text-base font-outfitRegular text-gray-500 mb-2">
                                Price
                            </Text>
                            <Text className="text-2xl font-outfitBold text-[#00AA55] capitalize">
                                Rp. {new Intl.NumberFormat('id-ID').format(selectedProduct?.price || 0)} / {selectedProduct?.productUnit || 'N/A'}
                            </Text>
                        </View>

                        {/* Category Section */}
                        <View className="border-t border-gray-200 pt-4">
                            <Text className="text-base font-outfitRegular text-gray-500 mb-2">
                                Category
                            </Text>
                            <Text className="text-xl font-outfitSemiBold text-[#2C3E50]">
                                {selectedProduct?.categoryName || 'Uncategorized'}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
                <View className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {/* Name Section */}
                        <View className="mb-5">
                            <Text className="text-base font-outfitRegular text-gray-500 mb-5">
                                Action
                            </Text>
                            <TouchableOpacity onPress={() => router.push("/dashboard/product/edit-product")} className="flex-row items-center gap-4">
                                <AntDesignIcons name='edit' className="w-[30px]" size={24} color='#2C3E50'/>
                            <Text className="text-2xl font-outfitSemiBold text-[#2C3E50]">
                                Edit
                            </Text>
                            </TouchableOpacity>
                          
                        </View>

                        {/* Category Section */}
                        <TouchableOpacity onPress={handleDeleteProduct} className="border-t border-gray-200 pt-4 flex-row items-center gap-4">
                            <AntDesignIcons name='delete' className="w-[30px]" size={24} color='red'/>
                            <Text className="text-2xl font-outfitSemiBold text-red-500">
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ProductDetail