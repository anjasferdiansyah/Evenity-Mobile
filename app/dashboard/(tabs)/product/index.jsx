import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setSelectedProduct} from "@/redux/slices/productVendorSlice";
import {router} from "expo-router";
import {Ionicons} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import BottomPadding from "@/components/misc/BottomPadding";
import {ROUTES} from "@/constant/ROUTES";

export default function ProductScreen() {
    const dispatch = useDispatch();
    const {id} = useSelector((state) => state.auth);
    const {products, status} = useSelector((state) => state.productVendor);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

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
            className="bg-white rounded-xl shadow-md mb-4 p-5"
        >
            <View className="flex-row justify-between items-center">
                <View className="flex-1 pr-4">
                    <Text className="text-xl font-outfitBold text-[#2C3E50] mb-2">
                        {item.name}
                    </Text>
                    <Text className="text-gray-500 font-outfitRegular">
                        {item.description}
                    </Text>
                </View>
                <Text className="text-2xl font-outfitBold text-[#00AA55]">
                    Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#F7F9FC]">
            <FlatList
                ListHeaderComponent={() => (
                    <View className="px-5 pt-5 pb-4 flex-row justify-between items-center">
                        <Text className="text-3xl font-outfitBold text-[#2C3E50]">
                            My Products
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push(ROUTES.DASHBOARD.PRODUCT.NEW)}
                            className="bg-[#00F279] p-2 rounded-full"
                        >
                            <Ionicons name="add" size={24} color="white"/>
                        </TouchableOpacity>
                    </View>
                )}
                data={products?.productList || []}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
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
                            No products available
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