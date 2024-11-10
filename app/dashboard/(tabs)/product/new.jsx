import { Alert, Text, TextInput, TouchableOpacity, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '@/redux/slices/categorySlice';
import { createNewProduct, getProduct } from '@/redux/slices/productVendorSlice';
import { router } from 'expo-router';
import { ROUTES } from "@/constant/ROUTES";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/helper/validator/schema';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

const New = () => {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(productSchema),
    });

    const { user, id } = useSelector((state) => state.auth);
    const { categories } = useSelector((state) => state.categorySlice);


    console.log("id", id);

    const dispatch = useDispatch();


    console.log("id", id);



    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);

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
            "Are you sure you want to create this product?",
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
                            vendorId: id
                        }

                        console.log("newProduct", newProduct);
    
                        try {
                            dispatch(createNewProduct(newProduct));
                            Alert.alert("Success", "Product created successfully.");
                            dispatch(getProduct(id));
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
                        <Text className="font-outfitRegular text-gray-500">Product Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter product name.."
                        />
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Vendor Type</Text>
                        <TouchableOpacity
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular">
                            <RNPickerSelect
                                onValueChange={(value) => setCategoryId(value)}
                                useNativeAndroidPickerStyle={false}
                                value={categoryId}
                                items={mapToLabelAndValue(categories)}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Price</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter Price"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Quantity</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter Quantity"
                            keyboardType="numeric"
                            value={qty}
                            onChangeText={setQty}
                        />
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Unit</Text>
                        <TouchableOpacity
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular">
                            <RNPickerSelect
                                onValueChange={(value) => setUnit(value)}
                                useNativeAndroidPickerStyle={false}
                                value={unit}
                                items={[
                                    {label: 'PCS', value: 'PCS'},
                                    {label: 'DAY', value: 'DAY'},
                                ]}
                            />
                        </TouchableOpacity>
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Description</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                            placeholder="Enter Description"
                            numberOfLines={3}
                            value={description}
                            onChangeText={setDescription}
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-[#00AA55] mx-auto w-[90%] mt-5 items-center justify-center px-8 py-3 rounded-full"
                        onPress={handleMakeProduct}
                    >
                        <Text className="text-white text-xl font-outfitBold">Make</Text>
                    </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default New;