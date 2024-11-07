import React from "react";
import { useSelector } from "react-redux";
import OrderDetailUser from "@/components/dashboard/transaction/detail/user";
import OrderDetailVendor from "@/components/dashboard/transaction/detail/vendor";
import { ROLE as ROLES } from "@/constant/USER";
import { View, Text } from "react-native";

export default function HistoryOrderDetailScreen() {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role;

    if (!role) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-outfitBold">You are not logged in</Text>
            </View>
        );
    }

    if (role === ROLES.CUSTOMER) {
    
        return <OrderDetailUser />;
    } else return <OrderDetailVendor />;
}
