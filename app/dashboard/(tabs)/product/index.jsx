import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setSelectedProduct} from "@/redux/slices/productVendorSlice";
import {router} from "expo-router";
import {AntDesign} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomPadding from "@/components/misc/BottomPadding";
import {ROUTES} from "@/constant/ROUTES";

export default function ProductScreen(callback, deps) {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.auth);
    const {products, status} = useSelector((state) => state.productVendor);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const fetchProducts = useCallback(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchProducts();
        setTimeout(() => setRefreshing(false), 2000);
    }, [fetchProducts]);

    const handleSelectDetail = (item) => {
        dispatch(setSelectedProduct(item));
        router.push(ROUTES.DASHBOARD.PRODUCT.DETAIL);
    };

    const renderProductItem = ({item}) => (
        <TouchableOpacity
            onPress={() => handleSelectDetail(item)}
            className="w-full mt-5 bg-[#00F279] p-8 rounded-lg"
        >
            <View>
                <Text className="text-3xl font-outfitBold text-white">
                    {item.name}
                </Text>
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
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                ListHeaderComponent={() => (
                    <View
                        className="mt-10 border-b border-gray-300 w-full px-5 flex flex-row items-center justify-between">
                        <Text className="w-full text-5xl font-outfitBold pb-4">
                            List Products
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push(ROUTES.DASHBOARD.PRODUCT.NEW)}
                        >
                            <AntDesign name="pluscircle" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                )}
                data={products?.productList || []}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingHorizontal: 20}}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#00F279']}
                        tintColor="#00F279"
                    />
                }
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-10">
                        <Text className="text-gray-500 text-lg font-outfitRegular">
                            No products found
                        </Text>
                    </View>
                )}
                ListFooterComponent={() => (
                    <>
                        {status === "loading" && (
                            <ActivityIndicator
                                size="large"
                                color="#00F279"
                                className="mt-4"
                            />
                        )}
                        <BottomPadding/>
                    </>
                )}
            />
        </SafeAreaView>
    );
}