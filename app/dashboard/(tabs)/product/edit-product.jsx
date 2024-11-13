import {Alert, Text, TextInput, TouchableOpacity,SafeAreaView, KeyboardAvoidingView, View, Platform, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {loadCategories} from '@/redux/slices/categorySlice';
import {createNewProduct, getProduct, getProductById, updateProduct} from '@/redux/slices/productVendorSlice';
import {router} from 'expo-router';
import {ROUTES} from "@/constant/ROUTES";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/helper/validator/schema';
import BottomPadding from '@/components/misc/BottomPadding';

const EditProduct = () => {


    const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(productSchema),
    });
    const {user, id} = useSelector((state) => state.auth);
    const {categories} = useSelector((state) => state.categorySlice);

    const { selectedProduct } = useSelector((state) => state.productVendor); 

    console.log("id", id);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);


    useEffect(() => {
        if(selectedProduct) {
            setValue("name", selectedProduct.name);
            setValue("categoryId", selectedProduct.categoryId);
            setValue("price", selectedProduct.price.toString());
            setValue("qty", selectedProduct.qty.toString());
            setValue("productUnit", selectedProduct.productUnit);
            setValue("description", selectedProduct.description);
        }
    }, [selectedProduct, setValue]);


    const mapToLabelAndValue = (categories) => {
        return categories.map((category) => ({
            label: category.mainCategory,
            value: category.id,
        }));
    }

    const onSubmit = async (data) => {
    
        // Confirm the action before proceeding
        Alert.alert(
            "Confirm",
            "Are you sure you want to update this product?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Confirm",
                    onPress: async () => {

                        const newProduct = {
                            ...data,
                            vendorId: id,
                            id : selectedProduct.id
                        }

                        console.log("newProduct", newProduct);
    
                        try {
                            dispatch(updateProduct(newProduct));
                            Alert.alert("Success", "Product updated successfully.");
                            router.push(ROUTES.DASHBOARD.PRODUCT.INDEX);
                        } catch (error) {
                            console.error('Error creating product:', error);
                            Alert.alert("Error", "There was an issue creating the product.");
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
       <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    className="flex-1 px-6 bg-white"
                >
                    <View className="mt-20 mb-6">
                        <Text className="text-4xl font-outfitBold text-gray-800">Edit Product</Text>
                        <Text className="text-gray-500 mt-2">Fill in the details for edit product</Text>
                    </View>

                    <View className="space-y-5">
                        {/* Product Name */}
                        <View className="mb-4">
                            <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Product Name</Text>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <TextInput
                                            value={value}
                                            onChangeText={onChange}
                                            className="bg-gray-100 py-3 px-4 rounded-xl text-base font-outfitRegular"
                                            placeholder="Enter product name.."
                                        />
                                        {errors.name && (
                                            <Text className="text-red-500 text-xs mt-1">
                                                {errors.name.message}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            />
                        </View>

                        {/* Vendor Type */}
                        <View className="mb-4">
                            <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Vendor Type</Text>
                            <Controller
                                control={control}
                                name="categoryId"
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <View className="bg-gray-100 rounded-xl overflow-hidden">
                                            <RNPickerSelect
                                                onValueChange={onChange}
                                                useNativeAndroidPickerStyle={false}
                                                value={value}
                                                items={mapToLabelAndValue(categories)}
                                                style={{
                                                    inputAndroid: {
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 12,
                                                        color: 'black',
                                                    },
                                                    inputIOS: {
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 12,
                                                        color: 'black',
                                                    },
                                                }}
                                            />
                                        </View>
                                        {errors.categoryId && (
                                            <Text className="text-red-500 text-xs mt-1">
                                                {errors.categoryId.message}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            />
                        </View>

                        {/* Price and Quantity in Row */}
                        <View className="flex-row space-x-4 mb-4 gap-2">
                            <View className="flex-1">
                                <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Price</Text>
                                <Controller
                                    control={control}
                                    name="price"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <TextInput
                                                className="bg-gray-100 py-3 px-4 rounded-xl text-base font-outfitRegular"
                                                placeholder="Enter Price"
                                                keyboardType="numeric"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                            {errors.price && (
                                                <Text className="text-red-500 text-xs mt-1">
                                                    {errors.price.message}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                />
                            </View>

                            {/* <View className="flex-1">
                                <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Quantity</Text>
                                <Controller
                                    control={control}
                                    name="qty"
                                    render={({ field: { onChange, value } }) => (
                                        <View>
                                            <TextInput
                                                className="bg-gray-100 py-3 px-4 rounded-xl text-base font-outfitRegular"
                                                placeholder="Enter Quantity"
                                                keyboardType="numeric"
                                                value={value}
                                                onChangeText={onChange}
                                            />
                                            {errors.qty && (
                                                <Text className="text-red-500 text-xs mt-1">
                                                    {errors.qty.message}
                                                </Text>
                                            )}
                                        </View>
                                    )}
                                />
                            </View> */}
                        </View>

                        {/* Unit */}
                        {/* <View className="mb-4">
                            <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Unit</Text>
                            <Controller
                                control={control}
                                name="productUnit"
                                render={({ field: { onChange, value } }) => (
                                    <View>
                                        <View className="bg-gray-100 rounded-xl overflow-hidden">
                                            <RNPickerSelect
                                                onValueChange={onChange}
                                                useNativeAndroidPickerStyle={false}
                                                value={value}
                                                items={[
                                                    { label: 'PCS', value: 'PCS' },
                                                    { label: 'DAY', value: 'DAY' },
                                                ]}
                                                style={{
                                                    inputAndroid: {
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 12,
                                                        color: 'black',
                                                    },
                                                    inputIOS: {
                                                        paddingHorizontal: 16,
                                                        paddingVertical: 12,
                                                        color: 'black',
                                                    },
                                                }}
                                            />
                                        </View>
                                        {errors.unit && (
                                            <Text className="text-red-500 text-xs mt-1">
                                                {errors.unit.message}
                                            </Text>
                                        )}
                                    </View>
                                )}
                            />
                        </View> */}

                        {/* Description */}
                        <View>
                            <Text className="text-sm font-outfitRegular text-gray-600 mb-2">Description</Text>
                            <Controller
                                control={control}
                                name="description"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        className="bg-gray-100 py-3 px-4 rounded-xl text-base font-outfitRegular h-24"
                                        placeholder="Enter Description"
                                        multiline
                                        textAlignVertical="top"
                                        value={value}
                                        onChangeText={onChange}
                                    />
                                )}
                            />
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            className={`bg-green-600 items-center justify-center py-4 rounded-full shadow-lg mt-4 ${!isValid ? 'opacity-50' : ''}`}
                            onPress={handleSubmit(onSubmit)}
                            disabled={!isValid}
                        >
                            <Text className="text-white text-lg font-outfitBold">Edit Product</Text>
                        </TouchableOpacity>
                    </View>
                    <BottomPadding />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default EditProduct;