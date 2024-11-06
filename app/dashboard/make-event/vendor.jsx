import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import tailwind from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MakeEventLayout from "@/app/dashboard/make-event/layout";
// import { registMakeEvent, makeEvent, addListSelected } from "../../redux/slices/makeEventSlice";
import { makeEvent, addListSelected } from "@/redux/slices/makeEventSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { loadCategories } from "@/redux/slices/categorySlice";
import { getPriceRange } from "@/redux/slices/productSlice";
import { set } from "zod";
import ListVendor from "@/components/ListVendors";

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
  const [isInputValid, setIsInputValid] = useState(false);
  const { id } = useSelector((state) => state.auth);

  const excludedIds = [
    "5384c23b-9e4b-4d01-8ee9-86bf7e114e69",
    "ac165cdd-57d5-426e-a115-faf1922ba7ed",
  ];

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  const validateInputs = () => {
    if (listSelectedCategory.length > 0) {
      setIsInputValid(true);
    } else {
      setIsInputValid(false);
    }
  };

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
        setLowestPrice("");
        setHighestPrice("");
      } else {
        setLowestPrice(priceRange.lowestPrice.toString());
        setHighestPrice(priceRange.highestPrice.toString());
        setVendorsAvailable(true);
      }
    } else if (status === "failed") {
      setVendorsAvailable(false);
      setLowestPrice("");
      setHighestPrice("");
    }
  }, [status, priceRange]);

  const handleMakeEvent = () => {
    console.log("id ", id);
    if (!isInputValid) {
      Alert.alert("Invalid Input", "Please select at least one category.");
      return;
    } else {
      console.log("listSelectedVendor", listSelectedVendor);
      const newEventData = {
        ...makeEventRegist,
        customerId: id,
        categoryProduct: listSelectedVendor,
        previousProduct: [],
      };
      console.log("newEventData", newEventData);
      console.log("naps", newEventData.categoryProduct);
      dispatch(addListSelected(newEventData.categoryProduct));

      dispatch(makeEvent(newEventData));
    }
  };

  // const uniqueCategories = categories.reduce((acc, category) => {
  //   if (!acc.some((item) => item.name === category.name)) {
  //     acc.push(category);
  //   }
  //   return acc;
  // }, []);
  const formatPriceInput = (value) => {
    let cleanValue = value.replace(/\D/g, "");

    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleLowestPriceChange = (value) => {
    setTempLowestPrice(value);
  };

  const handleHighestPriceChange = (value) => {
    setTempHighestPrice(value);
  };

  const uniqueCategories = categories
    .filter((category) => !excludedIds.includes(category.id))
    .reduce((acc, category) => {
      if (!acc.some((item) => item.name === category.name)) {
        acc.push(category);
      }
      return acc;
    }, [])
    .sort((a, b) => a.name.localeCompare(b.name));

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
      // setTempLowestPrice(lowestPrice.toString());
      setTempLowestPrice(formatPriceInput(lowestPrice));
    } else if (numericValue > parseInt(highestPrice, 10)) {
      // setTempLowestPrice(highestPrice.toString());
      setTempLowestPrice(formatPriceInput(highestPrice));
    } else {
      setLowestPrice(tempLowestPrice);
    }
  };

  const handleHighestPriceBlur = () => {
    const numericValue = parseInt(tempHighestPrice.replace(/[^0-9]/g, ""), 10);
    if (numericValue < parseInt(lowestPrice, 10)) {
      // setTempHighestPrice(lowestPrice.toString());
      setTempHighestPrice(formatPriceInput(lowestPrice));
    } else if (numericValue > parseInt(highestPrice, 10)) {
      // setTempHighestPrice(highestPrice.toString());
      setTempHighestPrice(formatPriceInput(highestPrice));
    } else {
      setHighestPrice(tempHighestPrice);
    }
  };

  function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    validateInputs();
  }, [listSelectedCategory]);

  return (
    <MakeEventLayout
      progress={90}
      nextRoute="transaction"
      handleNext={handleMakeEvent}
      isInputValid={isInputValid}
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
              placeholder={`Min: ${formatPrice(lowestPrice)}`}
              keyboardType="numeric"
              value={tempLowestPrice}
              // onChangeText={setTempLowestPrice}
              onChangeText={handleLowestPriceChange}
              onBlur={handleLowestPriceBlur}
            />
          </View>
          <View style={[tailwind`w-[40%]`]}>
            <Text className="font-outfitRegular">Highest Price</Text>
            <TextInput
              className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
              placeholder={`Max: ${formatPrice(highestPrice)}`}
              value={tempHighestPrice}
              keyboardType="numeric"
              // onChangeText={setTempHighestPrice}
              onChangeText={handleHighestPriceChange}
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
          <ListVendor
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
