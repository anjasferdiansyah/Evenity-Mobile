import { View, Text } from "react-native";
import tailwind from "twrnc";

export default function ListChooseVendor({ item, radius }) {
  return (
    <View
      key={item.id}
      className="flex flex-row gap-4 w-full px-10 items-center "
      style={[tailwind`mt-2`]}
    >
      <View
        className="flex flex-col gap-2"
        style={[tailwind`w-[90%] bg-slate-200 p-4 rounded-${radius}`]}
      >
        <Text className="font-outfitSemiBold text-[11px]">
          {item.vendorName}
        </Text>
        <Text className="font-outfitRegular text-[11px]">
          {item.productName}
        </Text>
        <Text className="font-outfitRegular text-[11px]">{item.cost}</Text>
      </View>
    </View>
  );
}
