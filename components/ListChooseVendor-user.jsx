import { View, Text } from "react-native";
import tailwind from "twrnc";

export default function ListChooseVendor({ item, radius }) {
    return (
        <View
            key={item?.id}
            className="flex flex-row w-full px-4 items-center"
            style={tailwind`mt-4`}
        >
            <View
                className={`flex flex-col gap-1 w-full bg-white p-4 rounded-${radius} shadow-lg`}
                style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 4,
                    elevation: 5,
                }}
            >
                <Text className="font-outfitSemiBold text-lg text-textPrimary">
                    {item?.vendorName}
                </Text>
                <Text className="font-outfitRegular text-sm text-textSecondary">
                    {item?.productName}
                </Text>
                <Text className="font-outfitRegular text-sm text-textSecondary">
                    {item?.cost}
                </Text>
            </View>
        </View>
    );
}