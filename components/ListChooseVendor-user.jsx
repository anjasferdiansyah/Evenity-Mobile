import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tailwind from "twrnc";

export default function ListChooseVendor({ item, radius }) {
  return (
    <View
      key={item.id}
      className="flex flex-row gap-4 w-full px-10 items-center "
      style={[tailwind`mt-2`]}
    >
      <View
        className="flex flex-row gap-2"
        style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-${radius}`]}
      >
        <Text className="font-outfitSemiBold text-xl max-w-28">{item.name}</Text>
        <Text
          className="font-outfitRegular text-xl"
          style={{ textAlign: "right", flex: 1 }}
        >
          {item.price}
        </Text>
      </View>
      <TouchableOpacity>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
}
