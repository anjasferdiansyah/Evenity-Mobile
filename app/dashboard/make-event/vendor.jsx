import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React from "react";
import tailwind from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListChooseVendor from "@/components/ListChooseVendor-user";
import MakeEventLayout from "@/app/dashboard/make-event/layout";

const MakeEventChooseVendor = () => {
    const entertainmentItems = [
        { id: 1, name: "Entertainment 1", price: "10.000.000" },
        { id: 2, name: "Entertainment 2", price: "15.000.000" },
        { id: 3, name: "Entertainment 2", price: "15.000.000" },
        { id: 4, name: "Entertainment 2", price: "15.000.000" },
    ];

    return (
        <MakeEventLayout progress={90} nextRoute="transaction">
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
                    <TextInput
                        className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight w-full"
                        placeholder="Choose vendor"
                    />
                </View>
                <View className="flex flex-row gap-2">
                    <View style={[tailwind`w-[40%]`]}>
                        <Text className="font-outfitRegular">Lowest Price</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
                            placeholder="Lowest price"
                        />
                    </View>
                    <View style={[tailwind`w-[40%]`]}>
                        <Text className="font-outfitRegular">Highest Price</Text>
                        <TextInput
                            className="border-[0.5px] py-2 px-4 rounded-xl border-gray-400 text-xs font-outfitLight"
                            placeholder="Highest price"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("MakeEventCapacity")}
                        className="mx-auto mt-4 items-center justify-center rounded-full"
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

            <ScrollView style={[tailwind`mt-5 `]} className="vendor-choosen">
                {entertainmentItems.map((item) => (
                    <ListChooseVendor key={item.id} item={item} radius="xl" />
                ))}
            </ScrollView>
        </MakeEventLayout>
    );
};

export default MakeEventChooseVendor;
