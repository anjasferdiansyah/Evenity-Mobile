import { View, Text } from "react-native";
import tailwind from "twrnc";

export default function ListChooseVendor({ item, radius }) {
    return (
        <View
            key={item.id}
            className="flex flex-row gap-4 w-full px-10 items-center"
            style={tailwind`mt-2`}
        >
            <View
                className="flex flex-col gap-2"
                style={[
                    tailwind`w-[90%] bg-white p-4 rounded-${radius} shadow-lg`,
                    {
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                    },
                ]}
            >
                <Text className="font-outfitSemiBold text-[11px] text-textPrimary">
                    {item.vendorName}
                </Text>
                <Text className="font-outfitRegular text-[11px] text-textSecondary">
                    {item.productName}
                </Text>
                <Text className="font-outfitRegular text-[11px] text-textSecondary">
                    {item.cost}
                </Text>
            </View>
        </View>
    );
}
