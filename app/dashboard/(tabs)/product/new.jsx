import { Alert, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '@/redux/slices/categorySlice';
import { createNewProduct, getProduct } from '@/redux/slices/productVendorSlice';
import { router } from 'expo-router';
import { ROUTES } from "@/constant/ROUTES";
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const New = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [qty, setQty] = useState('');
    const [unit, setUnit] = useState('');
    const [categoryId, setCategoryId] = useState('');

    const { user, id } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categorySlice);

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

    const mapToLabelAndValue = (categories) => {
        return categories.map((category) => ({
            label: category.mainCategory,
            value: category.id,
        }));
    }

    const handleMakeProduct = async () => {
        const newProduct = {
            name,
            description,
            price,
            qty,
            productUnit: unit,
            categoryId,
            vendorId: id,
        };

        try {
            dispatch(createNewProduct(newProduct));
            Alert.alert("Success", "Product created successfully.");
            dispatch(getProduct(id));
            router.push(ROUTES.DASHBOARD.PRODUCT.INDEX);
        } catch (error) {
            console.error('Error creating product:', error);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1 px-6 pt-6">
                    {/* Header */}
                    <View className="flex-row items-center mb-6 mt-10">
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            className="mr-4 p-2 rounded-full bg-[#F3F4F6]"
                        >
                            <AntDesignIcons name='arrowleft' size={20} color={'#374151'}/>
                        </TouchableOpacity>
                        <Text className="text-2xl font-outfitBold text-[#111827]">Create New Product</Text>
                    </View>

                    <View className="flex flex-col gap-4">

                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Product Name</Text>
                            <TextInput
                                value={name}
                                onChangeText={setName}
                                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-sm shadow-sm"
                                placeholder="Enter product name.."
                            />
                        </View>

                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Vendor Type</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setCategoryId(value)}
                                useNativeAndroidPickerStyle={false}
                                value={categoryId}
                                items={mapToLabelAndValue(categories)}
                                style={{
                                    inputIOS: {
                                        borderWidth: 1,
                                        borderColor: '#D1D5DB',
                                        borderRadius: 8,
                                        padding: 12,
                                        fontSize: 14,
                                        color: 'black',
                                        backgroundColor: 'white',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1,
                                    },
                                    inputAndroid: {
                                        borderWidth: 1,
                                        borderColor: '#D1D5DB',
                                        borderRadius: 8,
                                        padding: 12,
                                        fontSize: 14,
                                        color: 'black',
                                        backgroundColor: 'white',
                                    },
                                }}
                            />
                        </View>
                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Price</Text>
                            <TextInput
                                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-sm shadow-sm"
                                placeholder="Enter Price"
                                keyboardType="numeric"
                                value={price}
                                onChangeText={setPrice}
                            />
                        </View>

                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Quantity</Text>
                            <TextInput
                                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-sm shadow-sm"
                                placeholder="Enter Quantity"
                                keyboardType="numeric"
                                value={qty}
                                onChangeText={setQty}
                            />
                        </View>

                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Unit</Text>
                            <RNPickerSelect
                                onValueChange={(value) => setUnit(value)}
                                useNativeAndroidPickerStyle={false}
                                value={unit}
                                items={[
                                    { label: 'PCS', value: 'PCS' },
                                    { label: 'DAY', value: 'DAY' },
                                ]}
                                style={{
                                    inputIOS: {
                                        borderWidth: 1,
                                        borderColor: '#D1D5DB',
                                        borderRadius: 8,
                                        padding: 12,
                                        fontSize: 14,
                                        color: 'black',
                                        backgroundColor: 'white',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1,
                                    },
                                    inputAndroid: {
                                        borderWidth: 1,
                                        borderColor: '#D1D5DB',
                                        borderRadius: 8,
                                        padding: 12,
                                        fontSize: 14,
                                        color: 'black',
                                        backgroundColor: 'white',
                                    },
                                }}
                            />
                        </View>

                        <View className="flex flex-col gap-2">
                            <Text className="font-outfitRegular text-gray-600">Description</Text>
                            <TextInput
                                className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-3 text-sm shadow-sm"
                                placeholder="Enter Description"
                                numberOfLines={3}
                                value={description}
                                onChangeText={setDescription}
                            />
                        </View>

                        <TouchableOpacity
                            className="bg-green-600 mx-auto w-full mt-5 items-center justify-center px-8 py-5 rounded-full shadow-lg"
                            onPress={handleMakeProduct}
                        >
                            <Text className="text-white text-lg font-outfitBold">Create Product</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default New;