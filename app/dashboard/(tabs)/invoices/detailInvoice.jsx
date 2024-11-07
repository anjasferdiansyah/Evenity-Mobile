import React from "react";
import { useSelector } from "react-redux";
import InvoiceDetailUser from "@/components/dashboard/transaction/detail/invoiceDetail-user";
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
        return <InvoiceDetailUser />;
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-outfitBold">You are not logged in</Text>
            </View>
        );
    }
}
