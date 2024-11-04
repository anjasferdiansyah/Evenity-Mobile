import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import tailwind from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListChooseVendor from "@/components/ListChooseVendor-user";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
import { registMakeEvent, makeEvent } from "@/redux/slices/makeEventSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { loadCategories } from "@/redux/slices/categorySlice";
import { getPriceRange } from "@/redux/slices/productSlice";
import { set } from "zod";

const entertainmentItems = [
  { id: 1, name: "Entertainment 1", price: "10.000.000" },
  { id: 2, name: "Entertainment 2", price: "15.000.000" },
  { id: 3, name: "Entertainment 2", price: "15.000.000" },
  { id: 4, name: "Entertainment 2", price: "15.000.000" },
];

const MakeEventChooseVendor = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categorySlice);
  const { makeEventData } = useSelector((state) => state.makeEventSlice);
  const [selectedCategory, setSelectedCategory] = useState();
  const [listSelectedCategory, setListSelectedCategory] = useState([]);
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const { priceRange, status, isLoading } = useSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    console.log(itemValue);
    const data = {
      province: "East Java",
      city: "Malang",
      participant: 10,
      categoryId: "0e739ec0-8609-4038-98b0-3c9c8f26b30b",
    };
    // dispatch(getPriceRange(data));
    console.log(priceRange);
  };

  useEffect(() => {
    if (status === "succeeded" && priceRange.length > 0) {
      // setLowestPrice(priceRange[0].lowestPrice.toString());
      // setHighestPrice(priceRange[0].highestPrice.toString());
      console.log(priceRange);
    }
  }, [status, priceRange]);

  const handleMakeEvent = () => {
    const newEventData = {
      ...makeEventData,
      customerId: "05e2c49d-ee52-4d35-9ab8-6d8564f328bd",
      categoryProduct: JSON.stringify(listSelectedCategory), 
      previousProduct: JSON.stringify([]),
    };
    console.log("newEventData", newEventData);
    dispatch(makeEvent(newEventData));
  };

  const uniqueCategories = categories.reduce((acc, category) => {
    if (!acc.some((item) => item.mainCategory === category.mainCategory)) {
      acc.push(category);
    }
    return acc;
  }, []);

  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddCategory = () => {
    if (selectedCategory && lowestPrice && highestPrice) {
      const selectedCategoryData = uniqueCategories.find(
        (category) => category.id === selectedCategory
      );

      setListSelectedCategory((prevList) => [
        ...prevList,
        {
          id: selectedCategory + lowestPrice + highestPrice,
          categoryId: selectedCategory,
          name: selectedCategoryData.mainCategory,
          minCost: parseInt(lowestPrice, 10),
          maxCost: parseInt(highestPrice, 10),
        },
      ]);

      setSelectedCategory("");
      setLowestPrice("");
      setHighestPrice("");
    }
  };

  const handleRemoveCategory = (id) => {
    setListSelectedCategory((prevList) =>
      prevList.filter((item) => item.id !== id)
    );
  };

  const handleLowestPriceChange = (value) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (
      numericValue >= parseInt(lowestPrice, 10) &&
      numericValue <= parseInt(highestPrice, 10)
    ) {
      setLowestPrice(value);
    }
  };

  const handleHighestPriceChange = (value) => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (
      numericValue >= parseInt(lowestPrice, 10) &&
      numericValue <= parseInt(highestPrice, 10)
    ) {
      setHighestPrice(value);
    }
  };

  return (
    <MakeEventLayout
      progress={90}
      nextRoute="transaction"
      handleNext={handleMakeEvent}
    >
      <View className="px-10" style={[tailwind`my-2`]}>
        <Text className="text-6xl font-outfitSemiBold" style={[tailwind`mb-3`]}>
          Choose
        </Text>

        <Text className="text-6xl font-outfitExtraBold">Vendor?</Text>
      </View>
      <View
        className="flex flex-col gap-4 w-full mt-12 px-10"
        style={[tailwind`mt-2`]}
      >
        <View className="flex flex-col gap-2">
          <Text className="font-outfitRegular">Vendor Type</Text>
          <View className="border-[0.5px] px-4 rounded-xl border-gray-400">
            <Picker
              selectedValue={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <Picker.Item label="Select Category" value="" />
              {uniqueCategories.map((category) => (
                <Picker.Item
                  key={category.id}
                  label={toTitleCase(category.mainCategory)}
                  value={category.id}
                />
              ))}
            </Picker>
          </View>
        </View>
        <View className="flex flex-row gap-2">
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Lowest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder={`Min: ${lowestPrice}`}
              keyboardType="numeric"
              value={lowestPrice}
              onChangeText={setLowestPrice}
            />
          </View>
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Highest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder={`Max: ${highestPrice}`}
              value={highestPrice}
              keyboardType="numeric"
              onChangeText={setHighestPrice}
            />
          </View>
          <TouchableOpacity
            onPress={handleAddCategory}
            className="mx-auto mt-4 items-center justify-center rounded-full push-to"
            style={[tailwind`bg-[#00AA55] p-4`]}
          >
            <MaterialCommunityIcons
              name="chevron-down"
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={[tailwind`mt-5`]} className="vendor-choosen">
        {listSelectedCategory.map((item) => (
          <ListChooseVendor
            key={item.id}
            item={item}
            radius="xl"
            onRemove={() => handleRemoveCategory(item.id)}
          />
        ))}
      </ScrollView>
    </MakeEventLayout>
  );
};

export default MakeEventChooseVendor;
