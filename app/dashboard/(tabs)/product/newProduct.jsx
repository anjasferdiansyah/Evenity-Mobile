import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '@/redux/slices/categorySlice';
import { createNewProduct, getProduct } from '@/redux/slices/productVendorSlice';
import { router } from 'expo-router';

const NewProduct = () => {

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
      productUnit : unit,
      categoryId,
      vendorId: id,
    };

    try {
      dispatch(createNewProduct(newProduct));
      Alert.alert("Success", "Product created successfully.");
      dispatch(getProduct(id));
      router.push("/dashboard/product");

    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <View className="w-full p-10">
        <Text className="text-4xl mt-20 font-outfitBold w-full">Create New Product</Text>
        <View className="flex flex-col gap-4 py-6">
          
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
            <TouchableOpacity className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" >
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
            <TouchableOpacity className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitRegular" >
            <RNPickerSelect
              onValueChange={(value) => setUnit(value)}
              useNativeAndroidPickerStyle={false}
              value={unit}
              items={[
                { label: 'PCS', value: 'PCS' },
                { label: 'DAY', value: 'DAY' },
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
      </View>
    </View>
  );
}

export default NewProduct;
