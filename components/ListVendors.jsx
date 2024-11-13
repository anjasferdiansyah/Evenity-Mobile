import { View, Text, TouchableOpacity } from "react-native";
import tailwind from "twrnc";
import { MaterialIcons } from "@expo/vector-icons";

export default function ListVendor({ item, radius, onRemove }) {
    const toTitleCase = (str) => {
            const words = str.replace(/_/g, ' ').split(' ');
            const titleCasedWords = words.map(word => {
                if (word.length > 0) {
                    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
                return word;
            });
            return titleCasedWords.join(' ');
        };

    return (
        <View
            key={item.id}
            className="flex flex-row gap-4 w-full px-10 items-center"
            style={tailwind`mt-4`}
        >
            <View
                className="flex flex-col gap-2 w-[90%] bg-white p-4 rounded-xl border border-gray-300"
            >
                <Text className="font-outfitSemiBold text-lg text-gray-800">{toTitleCase(item.name)}</Text>
                <Text className="font-outfitRegular text-sm text-gray-600">
                    Min Cost: <Text className="font-bold text-gray-800">{item.minCost}</Text>
                </Text>
                <Text className="font-outfitRegular text-sm text-gray-600">
                    Max Cost: <Text className="font-bold text-gray-800">{item.maxCost}</Text>
                </Text>
            </View>
            <TouchableOpacity
                className="py-2 px-2 bg-red-600 rounded-full transition duration-200 transform hover:scale-105"
                onPress={onRemove}
            >
                <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}