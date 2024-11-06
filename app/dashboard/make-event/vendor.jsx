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
// import { registMakeEvent, makeEvent, addListSelected } from "../../redux/slices/makeEventSlice";
import { makeEvent, addListSelected } from "@/redux/slices/makeEventSlice";
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
  const { makeEventData, makeEventRegist } = useSelector(
    (state) => state.makeEventSlice
  );
  const { priceRange, status, isLoading, error } = useSelector(
    (state) => state.productSlice
  );
  const [selectedCategory, setSelectedCategory] = useState();
  const [listSelectedCategory, setListSelectedCategory] = useState([]);
  const [listSelectedVendor, setListSelectedVendor] = useState([]);
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");

  const [tempLowestPrice, setTempLowestPrice] = useState("");
  const [tempHighestPrice, setTempHighestPrice] = useState("");
  const [vendorsAvailable, setVendorsAvailable] = useState(true);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const handleCategoryChange = (itemValue) => {
    setSelectedCategory(itemValue);
    console.log("selectedCategory", selectedCategory);
    console.log("itemValue", itemValue);
    const data = {
      province: makeEventRegist.province,
      city: makeEventRegist.city,
      participant: makeEventRegist.participant,
      startDate: makeEventRegist.startDate,
      endDate: makeEventRegist.endDate,
      categoryId: itemValue,
    };
    console.log("data", data);
    dispatch(getPriceRange(data));
  };

  useEffect(() => {
    if (status === "succeeded" && priceRange) {
      if (priceRange.lowestPrice === null || priceRange.highestPrice === null) {
        setVendorsAvailable(false);
        setLowestPrice(""); // Reset to default value
        setHighestPrice(""); // Reset to default value
      } else {
        setLowestPrice(priceRange.lowestPrice.toString());
        setHighestPrice(priceRange.highestPrice.toString());
        setVendorsAvailable(true); // Reset to true if vendors are available
      }
    } else if (status === "failed") {
      setVendorsAvailable(false);
      setLowestPrice(""); // Reset to default value
      setHighestPrice(""); // Reset to default value
    }
  }, [status, priceRange]);

  const handleMakeEvent = () => {
    console.log("listSelectedVendor", listSelectedVendor);
    // dispatch(addListSelected(listSelectedVendor));
    const newEventData = {
      ...makeEventRegist,
      customerId: "05e2c49d-ee52-4d35-9ab8-6d8564f328bd",
      categoryProduct: listSelectedVendor,
      previousProduct: [],
    };
    console.log("newEventData", newEventData);
    //get categoryProduct
    console.log("naps", newEventData.categoryProduct);
    dispatch(addListSelected(newEventData.categoryProduct));

    dispatch(makeEvent(newEventData));
  };

  const uniqueCategories = categories.reduce((acc, category) => {
    if (!acc.some((item) => item.name === category.name)) {
      acc.push(category);
    }
    return acc;
  }, []);

  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const handleAddCategory = () => {
    if (selectedCategory && lowestPrice && highestPrice) {
      const selectedCategoryData = categories.find(
        (category) => category.id === selectedCategory
      );

      const newCategory = {
        categoryId: selectedCategory,
        minCost: parseInt(lowestPrice, 10),
        maxCost: parseInt(highestPrice, 10),
      };

      console.log("newCategory", newCategory);

      setListSelectedVendor((prevList) => [...prevList, newCategory]);

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

      console.log("listSelectedCategory", listSelectedCategory);

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

  const handleLowestPriceBlur = () => {
    const numericValue = parseInt(tempLowestPrice.replace(/[^0-9]/g, ""), 10);
    if (numericValue < parseInt(lowestPrice, 10)) {
      setTempLowestPrice(lowestPrice.toString());
    } else if (numericValue > parseInt(highestPrice, 10)) {
      setTempLowestPrice(highestPrice.toString());
    } else {
      setLowestPrice(tempLowestPrice);
    }
  };

  const handleHighestPriceBlur = () => {
    const numericValue = parseInt(tempHighestPrice.replace(/[^0-9]/g, ""), 10);
    if (numericValue < parseInt(lowestPrice, 10)) {
      setTempHighestPrice(lowestPrice.toString());
    } else if (numericValue > parseInt(highestPrice, 10)) {
      setTempHighestPrice(highestPrice.toString());
    } else {
      setHighestPrice(tempHighestPrice);
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
              value={tempLowestPrice}
              onChangeText={setTempLowestPrice}
              onBlur={handleLowestPriceBlur}
            />
          </View>
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Highest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder={`Max: ${highestPrice}`}
              value={tempHighestPrice}
              keyboardType="numeric"
              onChangeText={setTempHighestPrice}
              onBlur={handleHighestPriceBlur}
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
        {!vendorsAvailable && (
          <Text className="text-red-500 mt-2">
            No vendors available. Please try a different category.
          </Text>
        )}
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
