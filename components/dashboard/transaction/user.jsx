import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import tailwind from "twrnc";
import {router} from "expo-router";

const OrderHistoryUser = () => {
    const historyItems = [
        {
            id: 1,
            date: "20/12/2024",
            location: "Malang, Indonesia",
            status: "Success",
        },
        {
            id: 2,
            date: "21/12/2024",
            location: "Jakarta, Indonesia",
            status: "Failed",
        },
        {
            id: 3,
            date: "22/12/2024",
            location: "Surabaya, Indonesia",
            status: "Success",
        },
        {
            id: 4,
            date: "23/12/2024",
            location: "Bandung, Indonesia",
            status: "Success",
        },
        {
            id: 5,
            date: "24/12/2024",
            location: "Bali, Indonesia",
            status: "Failed",
        },
        {
            id: 6,
            date: "25/12/2024",
            location: "Yogyakarta, Indonesia",
            status: "Success",
        },
        {
            id: 7,
            date: "26/12/2024",
            location: "Solo, Indonesia",
            status: "Success",
        },
        {
            id: 8,
            date: "27/12/2024",
            location: "Malang, Indonesia",
            status: "Failed",
        },
        {
            id: 9,
            date: "28/12/2024",
            location: "Jakarta, Indonesia",
            status: "Success",
        },
        {
            id: 10,
            date: "29/12/2024",
            location: "Surabaya, Indonesia",
            status: "Failed",
        },
        {
            id: 11,
            date: "30/12/2024",
            location: "Bandung, Indonesia",
            status: "Failed",
        },
    ];

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <View className="w-full h-full pt-20 px-10">
                <Text className="text-5xl font-outfitBold">History Orders</Text>
                <ScrollView style={[tailwind`mt-5`]}>
                    <View className="list-history">
                        {historyItems.map((item) => (
                            <TouchableOpacity
                                onPress={() => router.push("/dashboard/transaction/detail")}
                                key={item.id}
                            >
                                <View
                                    className={`flex flex-row justify-between items-center mt-3 p-6 ${
                                        item.status === "Success" ? "bg-[#00F279]" : "bg-red-500"
                                    } rounded-full`}
                                >
                                    <View>
                                        <Text className="text-3xl font-outfitBold text-center text-white">
                                            {item.date}
                                        </Text>
                                        <Text className="font-outfitRegular text-center text-white">
                                            {item.location}
                                        </Text>
                                    </View>

                                    <View className="p-4 bg-white rounded-full">
                                        <AntDesignIcons
                                            name="right"
                                            size={30}
                                            color={`${item.status === "Success" ? "#00AA55" : "red"}`}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default OrderHistoryUser;
