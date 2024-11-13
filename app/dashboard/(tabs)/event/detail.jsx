import React from "react";
import {useSelector} from "react-redux";
import EventDetailUser from "@/components/dashboard/transaction/detail/event-detail-user";
import {ROLE as ROLES} from "@/constant/USER";
import {Text, View} from "react-native";

export default function HistoryOrderDetailScreen() {
    const {user} = useSelector((state) => state.auth);
    const role = user?.role;

    if (!role) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-outfitBold">You are not logged in</Text>
            </View>
        );
    }

    if (role === ROLES.CUSTOMER) {
        return <EventDetailUser/>;
    } else {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-2xl font-outfitBold">You are not supposed to be here</Text>
            </View>
        );
    }
}
