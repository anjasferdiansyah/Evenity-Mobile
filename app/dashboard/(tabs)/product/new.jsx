import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {loadCategories} from '@/redux/slices/categorySlice';
import {createNewProduct, getProduct} from '@/redux/slices/productVendorSlice';
import {router} from 'expo-router';
import {ROUTES} from "@/constant/ROUTES";
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/helper/validator/schema';

const New = () => {

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(productSchema),
    });

    const {user, id} = useSelector((state) => state.auth);
    const {categories} = useSelector((state) => state.categorySlice);


    console.log("id", id);

    const dispatch = useDispatch();

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
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full p-10">
                <Text className="text-4xl mt-20 font-outfitBold w-full">Create New Product</Text>
                <View className="flex flex-col gap-4 py-6">

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Product Name</Text>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                                    placeholder="Enter product name.."
                                />
                            )}
                        />
                        {errors.name && <Text style={{ color: 'red' }}>{errors.name.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Vendor Type</Text>
                        <Controller
                            control={control}
                            name="categoryId"
                            render={({ field: { onChange, value } }) => (
                                <View className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular">
                                     <RNPickerSelect
                                    onValueChange={onChange}
                                    useNativeAndroidPickerStyle={false}
                                    value={value}
                                    items={mapToLabelAndValue(categories)}
                                />
                                </View>
                            
                            )}
                        />
                        {errors.categoryId && <Text style={{ color: 'red' }}>{errors.categoryId.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Price</Text>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                                    placeholder="Enter Price"
                                    keyboardType="numeric"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.price && <Text style={{ color: 'red' }}>{errors.price.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Quantity</Text>
                        <Controller
                            control={control}
                            name="qty"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                                    placeholder="Enter Quantity"
                                    keyboardType="numeric"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                        {errors.qty && <Text style={{ color: 'red' }}>{errors.qty.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Unit</Text>
                        <Controller
                            control={control}
                            name="productUnit"
                            render={({ field: { onChange, value } }) => (
                                <View className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular">
                                <RNPickerSelect
                                    onValueChange={onChange}
                                    useNativeAndroidPickerStyle={false}
                                    value={value}
                                    items={[
                                        { label: 'PCS', value: 'PCS' },
                                        { label: 'DAY', value: 'DAY' },
                                    ]}
                                />
                                </View>
                            )}
                        />
                        {errors.unit && <Text style={{ color: 'red' }}>{errors.unit.message}</Text>}
                    </View>

                    <View className="flex flex-col gap-2">
                        <Text className="font-outfitRegular text-gray-500">Description</Text>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular"
                                    placeholder="Enter Description"
                                    numberOfLines={3}
                                    value={value}
                                    onChangeText={onChange}
                                />
                            )}
                        />
                    </View>

                    <TouchableOpacity
                        className="bg-[#00AA55] mx-auto w-[90%] mt-5 items-center justify-center px-8 py-3 rounded-full"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text className="text-white text-xl font-outfitBold">Make</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

export default New;
