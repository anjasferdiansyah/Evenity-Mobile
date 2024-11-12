import {Text, View} from "react-native";
import tailwind from "twrnc";

const TotalCost = ({totalCost}) => {
    return (
        <View style={tailwind`flex flex-row gap-4 w-full mt-12 items-center mb-5`}>
            <View style={tailwind`flex flex-row gap-2 justify-center p-4 rounded-full bg-gray-100`}>
                <Text className="font-outfitSemiBold text-xl">Total</Text>
                <Text
                    className="font-outfitRegular text-xl"
                    style={{textAlign: "right", flex: 1}}
                >
                    {typeof totalCost === 'number' && totalCost > 0
                        ? totalCost.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).replace("IDR", "")
                        : "Rp 0"}
                </Text>
            </View>
        </View>
    );
};

export default TotalCost;