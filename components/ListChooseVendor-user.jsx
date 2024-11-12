import {Text, TouchableOpacity, View} from "react-native";
import tailwind from "twrnc";
import {FontAwesome6} from "@expo/vector-icons";
import {useEffect, useState} from "react";

export default function ListChooseVendor({item, onVendorPress, lockedVendors, setLockedVendors}) {
    const [isLocked, setIsLocked] = useState(false);

    // Reset isLocked state when the item changes
    useEffect(() => {
        setIsLocked(false); // Reset isLocked to false when item changes
    }, [item]);

    function handleLock(item) {
        return () => {
            setIsLocked(!isLocked);
            if (!isLocked) {
                setLockedVendors([...lockedVendors, item]);
            } else {
                setLockedVendors(lockedVendors.filter((vendor) => vendor.productId !== item.productId));
            }
        };
    }

    return (
        <View
            // key={item.productId}
            className="flex flex-row w-full px-4 justify-between items-center m-2"
            style={tailwind`mt-4`}
        >
            <TouchableOpacity
                className={isLocked ? `flex flex-col w-10/12 gap-1 p-4 rounded-xl border-accent border-2` : `flex flex-col w-10/12 gap-1 bg-white p-4 rounded-xl shadow-lg`}
                onPress={() => onVendorPress(item)}
            >
                <View
                    style={{
                        shadowColor: "#000",
                        shadowOffset: {width: 0, height: 2},
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
            </TouchableOpacity>
            <TouchableOpacity className="w-2/12 flex justify-center items-center text-center"
                onPress={handleLock(item)}>
                {isLocked ? <FontAwesome6 name="lock" size={24} color="orange"/> :
                    <FontAwesome6 name="unlock" size={24} color="black"/>}
            </TouchableOpacity>
        </View>
    );
}