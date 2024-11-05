import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, setSelectedProduct } from "@/redux/slices/productVendorSlice";
import { router } from "expo-router";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const { products, status } = useSelector((state) => state.productVendor);

  const productList = products?.productList;

  const handleSelectDetail = (item) => {
    dispatch(setSelectedProduct(item));
    router.push("dashboard/product/detail");
  };

  const renderItem = ({ item, handleSelectDetail }) => (
    <TouchableOpacity
      onPress={() => handleSelectDetail(item)}
      className="w-full mt-5 bg-[#00F279] p-8 rounded-lg"
    >
      <View>
        <Text className="text-3xl font-outfitBold text-white">{item.name}</Text>
        <Text className="font-outfitRegular text-white">
          {item.description}
        </Text>
      </View>
      <View>
        <Text className="text-3xl font-outfitBold text-white pt-8">
          {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 justify-center bg-white">
      <View className="w-full px-10">
        <View className="mt-10 border-b border-gray-300 w-full px-5">
          <Text className="w-full text-5xl font-outfitBold pb-4">
            List Products
          </Text>
        </View>

        {status === "loading" && (
          <ActivityIndicator size="large" color="#00F279" />
        )}
        {status === "success" && (
          <View className="h-[70%]">
            <FlatList
              data={productList}
              renderItem={({ item }) =>
                renderItem({
                  item,
                  handleSelectDetail: () => handleSelectDetail(item),
                })
              }
              keyExtractor={(item) => item.id}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default index;
